import React from 'react';
import PropTypes from 'prop-types';
import styles from './Balance.module.css';

const Balance = ({ balance, deposits, withdrawals }) => (
  <section className={styles.balance}>
    <span className={styles.balance__text}>&#8593; {`${deposits}$`}</span>
    <span className={styles.balance__text}>&#8595; {`${withdrawals}$`}</span>
    <span className={styles.balance__text}>Balance: {`${balance}`}</span>
  </section>
);

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
  deposits: PropTypes.number.isRequired,
  withdrawals: PropTypes.number.isRequired,
};

export default Balance;
