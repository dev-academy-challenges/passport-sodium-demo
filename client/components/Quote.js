import React, { Component } from 'react'
import { connect } from 'react-redux'
import ErrorMessage from './ErrorMessage'
import { fetchQuote, fetchSecretQuote } from '../actions'

class Quote extends Component {
  render() {
    const { onQuoteClick, onSecretQuoteClick, isAuthenticated, quote } = this.props

    return (
      <div>
        <div className='col-sm-3'>
          <button onClick={onQuoteClick} className="btn btn-primary">
            Get Quote
          </button>
        </div>

        <div className='col-sm-3'>
          <button onClick={onSecretQuoteClick} className="btn btn-warning">
            Get Secret Quote
          </button>
        </div>

        <div className='col-sm-6'>

          { quote && isAuthenticated &&
            <div>
              <span className="label label-danger">Quote</span>
              <hr/>
              <blockquote>
                {quote}
              </blockquote>
            </div>
          }

          <ErrorMessage reducer="quote" />

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    quote: state.quote.quote,
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onQuoteClick: () => dispatch(fetchQuote()),
    onSecretQuoteClick: () => dispatch(fetchSecretQuote())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Quote)