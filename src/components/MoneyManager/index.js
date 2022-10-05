import {Component} from 'react'
import {v4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import TransactionItems from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    typeInput: '',
    list: [],
    balance: 0,
    income: 0,
    expenses: 0,
  }

  submittingTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, typeInput} = this.state

    const newItem = {
      id: v4(),
      title: titleInput,
      amount: amountInput,
      type: typeInput,
    }
    this.setState(prevState => ({
      list: [...prevState.list, newItem],
      titleInput: '',
      amountInput: '',
      typeInput: '',
    }))
    if (typeInput === 'Income') {
      this.setState(prevState => ({
        income: prevState.income + parseInt(amountInput),
      }))
      this.setState(prevState => ({
        balance: prevState.balance + parseInt(amountInput),
      }))
    } else {
      this.setState(prevState => ({
        expenses: prevState.expenses + parseInt(amountInput),
      }))
      this.setState(prevState => ({
        balance: prevState.balance - parseInt(amountInput),
      }))
    }
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeType = event => {
    this.setState({typeInput: event.target.value})
  }

  deletingTransaction = id => {
    const {list} = this.state
    this.setState({list: list.filter(each => each.id !== id)})
  }

  render() {
    const {list, income, expenses, balance} = this.state

    return (
      <div className="bg">
        <div className="welcomeContainer">
          <h1 className="main_heading">Hi, Richard</h1>
          <p className="para">
            Welcome back to your
            <span className="highlighting">Money Manager</span>
          </p>
        </div>
        <div className="moneyDetailsContainer">
          <MoneyDetails income={income} expenses={expenses} balance={balance} />
        </div>
        <div className="transactionSessions">
          <div className="transactionForm">
            <h1>Add Transaction</h1>
            <form onSubmit={this.submittingTransaction}>
              <div className="inputs">
                <label htmlFor="title">TITLE</label>
                <input
                  className="inputBox"
                  type="text"
                  id="title"
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="inputs">
                <label htmlFor="amount">Amount</label>
                <input
                  className="inputBox"
                  type="text"
                  id="amount"
                  onChange={this.onChangeAmount}
                />
              </div>
              <div className="inputs">
                <label htmlFor="type">TYPE</label>
                <select
                  className="inputBox"
                  id="type"
                  onChange={this.onChangeType}
                >
                  {transactionTypeOptions.map(each => (
                    <option value={each.optionId}>{each.displayText}</option>
                  ))}
                </select>
                <div>
                  <button type="submit" className="button">
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="transactionForm">
            <h1>History</h1>
            <div className="list">
              <div className="listItems">
                <p className="listHeadings">TITLE</p>
                <p className="listHeadings">AMOUNT</p>
                <p className="listHeadings">TYPE</p>
              </div>
              <ul>
                {list.map(each => (
                  <TransactionItems
                    title={each.title}
                    amount={each.amount}
                    type={each.type}
                    key={each.id}
                    details={each}
                    deletingTransaction={this.deletingTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
