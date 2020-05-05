/* eslint-disable radix */
import React, { useState, useEffect } from 'react';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category_name: string;
  created_at: Date;
}
// category: { title: string };

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const { transactions: transactionsList, balance: balanceValue } = await (
        await api.get('/transactions')
      ).data;

      setTransactions(transactionsList);
      setBalance(balanceValue);
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(parseInt(balance.income))}
            </h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(parseInt(balance.outcome))}
            </h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(parseInt(balance.total))}
            </h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            {/* <tr>
                <td className="title">Computer</td>
                <td className="income">R$ 5.000,00</td>
                <td>Sell</td>
                <td>20/04/2020</td>
              </tr> */}
            <tbody>
              {/* {transactions.map(value => {
                return (
                  <>
                    <tr key={`${value.id}b`}>
                      <td className="title">{value.title}</td>
                      <td className={value.type}>
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(value.value)}
                      </td>
                      <td>{value.category}</td>
                      <td>{value.created_at}</td>
                    </tr>
                  </>
                );
              })} */}

              {/* <td className={value.type}>
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(value.value)}
                      </td> */}
              {transactions.map(value => {
                // console.log(value);
                return (
                  <tr key={`${value.id}`}>
                    <td className="title">{value.title}</td>
                    <td className={value.type}>
                      {value.type === 'outcome'
                        ? `- ${formatValue(value.value)}`
                        : formatValue(value.value)}
                    </td>
                    <td>{value.category_name}</td>
                    <td>20/04/2020</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
