import React, { Component } from 'react';
    //import the library
    import PaystackButton from 'react-paystack';
 
    class Paystack extends Component {
 
    	state = {
    		key: "pk_test_213968876e504230bc3a5a9ff93f68fe3a7565ab", //PAYSTACK PUBLIC KEY
    		email: this.props.email,  // customer email
            amount: this.props.toPay * 100, //equals NGN100,
            disable: false,
              
            
    	}
 
    	callback = (response) => {
            console.log(response);
            this.props.onSuccess(response) // card charged successfully, get reference here
    	}
 
    	close = () => {
    		console.log("Payment closed");
    	}
 
    	getReference = () => {
    		//you can put any unique reference implementation code here
    		let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";
 
    		for( let i=0; i < 15; i++ )
    			text += possible.charAt(Math.floor(Math.random() * possible.length));
 
    		return text;
        }
        
        /*
            reference: "S421eVQqa3MI2jp"
            trans: "445100817"
            status: "success"
            message: "Approved"
            transaction: "445100817"
            trxref: "S421eVQqa3MI2jp"

        */
 
      render() {
        return (
          <div>
            <p>
              <PaystackButton
                text="Make Payment"
                class="payButton"
                callback={this.callback}
                close={this.close}
                disabled={this.state.disable}
                embed={false} 
                reference={this.getReference()}
                email={this.state.email}
                amount={this.state.amount}
                paystackkey={this.state.key}
                tag="button"
              />
            </p>
          </div>
        );
      }
    }
 
    export default Paystack;