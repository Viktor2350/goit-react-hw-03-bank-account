import React, { Component } from 'react';
import shortid from 'shortid';
import { toast } from 'react-toastify';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import 'react-toastify/dist/ReactToastify.css';

class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
    inputValue: '',
  };

  componentDidMount() {
    const parsistedTransactions = localStorage.getItem('transactions');
    const parsistedBalance = localStorage.getItem('balance');

    if (parsistedTransactions && parsistedBalance) {
      this.setState({
        transactions: JSON.parse(parsistedTransactions),
        balance: JSON.parse(parsistedBalance),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { transactions, balance } = this.state;
    if (prevState.transactions !== transactions) {
      localStorage.setItem('transactions', JSON.stringify([...transactions]));
      localStorage.setItem('balance', JSON.stringify(balance));
    }
  }

  handleChange = event => {
    if (/^([0-9.?])+$/) {
      this.setState({
        inputValue: event.target.value,
      });
    }
  };

  handleClick = ({ target }) => {
    const date = new Date().toLocaleString();
    const { balance, inputValue } = this.state;

    const newTransactions = {
      id: shortid.generate(),
      type: target.name,
      amount: Number(inputValue),
      date,
    };

    if (newTransactions.type === 'withdrawal' && inputValue > balance) {
      toast.error('На счету недостаточно средств для проведения операции!');
      return;
    }
    if (newTransactions.amount <= 0 || !newTransactions.amount) {
      toast.warn('Введите сумму для проведения операции!');
      return;
    }

    this.setState(state => ({
      transactions: [...state.transactions, newTransactions],
      balance:
        newTransactions.type === 'deposit'
          ? state.balance + newTransactions.amount
          : state.balance - newTransactions.amount,
      inputValue: '',
    }));
  };

  render() {
    const { balance, transactions, inputValue } = this.state;

    const deposits = [...transactions].reduce((acc, deposit) => {
      if (deposit.type === 'deposit') {
        return acc + deposit.amount;
      }
      return acc;
    }, 0);

    const withdrawals = [...transactions].reduce((acc, withdrawal) => {
      if (withdrawal.type === 'withdrawal') {
        return acc + withdrawal.amount;
      }
      return acc;
    }, 0);

    return (
      <div className="dashboard">
        <Controls
          inputValue={inputValue}
          handleChange={this.handleChange}
          handleClick={this.handleClick}
        />
        <Balance
          balance={balance}
          withdrawals={withdrawals}
          deposits={deposits}
        />
        <TransactionHistory transactions={transactions} />
      </div>
    );
  }
}

export default Dashboard;
