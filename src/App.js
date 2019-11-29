import React from 'react';
import './App.css';

import SaintsService from './services/Saints'
import LiturgyService from './services/Liturgy'

class App extends React.Component {
  constructor(props) {
    super (props);

    let date = new Date();
    this.state = {
      text: '',
      tab: this.TAB_LITURGY,
      date: date
    }

    this.getLiturgy(new Date());
  }

  TAB_LITURGY = 1001;
  TAB_SAINTS = 1002;

  setDay = (prop) => {
    let date = this.state.date
    date.setDate(date.getDate() + prop)

    this.setState({
      ...this.state,
      date
    })
    this.fetchData(this.state.tab);
  }

  fetchData = (choosenTab) => {
    if (choosenTab === this.TAB_LITURGY) {
      this.getLiturgy(this.state.date);
    } else if (choosenTab === this.TAB_SAINTS) {
      this.getSaints(this.state.date);
    }
  }

  getLiturgy = async (date) => {
    const res = await LiturgyService.getLiturgyFromDate(date)
    const text = res && res.data && res.data.text ? res.data.text : ''

    this.setState({
      ...this.state,
      text
    })
  }
  getSaints = async (date) => {
    const res = await SaintsService.getSaintsFromDate(date)
    const text = res && res.data && res.data.text ? res.data.text : ''

    this.setState({
      ...this.state,
      text
    })
  }

  getPreviousDay = async () => {
    this.setDay(-1);
  }
  getNextDay = async () => {
    this.setDay(1);
  }

  getFormattedDate = (date) => {
    return `${this.getDayOfWeek(date)}, \n
            ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }

  getDayOfWeek = (date) => {
    let dateObj = [ 'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado' ]
    return dateObj[date.getDay()]
  }

  toogleTab = (choosenTab) => {
    this.setState({
      ...this.state,
      tab: choosenTab
    })
    this.fetchData(choosenTab);
  }

  render() {
    return (
      <div className="App">
        <div className="flex flex-align-center flex-justify-center">
          <div className="flex flex0 ph-2 pointer" onClick={this.getPreviousDay}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/><path fill="none" d="M0 0h24v24H0V0z"/></svg>
          </div>
          <h3 className="flex flex1 flex-justify-center text-center">
            { this.getFormattedDate( this.state.date ) }
          </h3>
          <div className="flex flex0 ph-2 flex-justify-end pointer" onClick={this.getNextDay}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/><path fill="none" d="M0 0h24v24H0V0z"/></svg>
          </div>
        </div>
        <div className="flex flex-align-center flex-justify-center">
          <button
            onClick={() => this.toogleTab(this.TAB_LITURGY)}
            className={
              `flex1 btn-top ${this.state.tab === this.TAB_LITURGY && 'active'}`
            }>Liturgia
          </button>
          <button
            onClick={() => this.toogleTab(this.TAB_SAINTS)}
            className={
              `flex1 btn-top ${this.state.tab === this.TAB_SAINTS && 'active'}`
            }>Santo do Dia
          </button>
        </div>
        <div className="paragraph" dangerouslySetInnerHTML={{__html: this.state.text.replace(/(<? *script)/gi, 'illegalscript')}}></div>
      </div>
    );
  }
}

export default App;

