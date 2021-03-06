import React, {Component} from 'react'
import Filter from '../components/Filter'
import StoreCollection from './StoreCollection'
import {withRouter} from 'react-router-dom'

class StorePage extends Component{
//needs conditional, if store is already linked to customer by stampcard, then we generate th StampCardConfirmation
//page else we generate the deals page
  render(){
    if (!!localStorage.getItem("token")){
      if (this.props.stores.length > 0){
        return(

          <div className="container-page">
            <Filter stores={this.props.stores} handleSearch={this.props.handleSearch}/>

            <StoreCollection stores={this.props.stores} />
          </div>
        )
      }
      else{
        return(
          <div>
            GET STAMP CARDS BY VISITING STORES
          </div>
        )
      }

    }
    else{
      alert("Please Login!")
      this.props.history.push('/')
      return null
    }

  }


}

export default withRouter(StorePage)
