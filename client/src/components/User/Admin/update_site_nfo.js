import React, { Component } from 'react';
import FormField from '../../utils/Form/formfield';
import { update, generateData, isFormValid, populateFields } from '../../utils/Form/formActions';

import { connect } from 'react-redux';
import {getSiteData,updateSiteData} from '../../../actions/site_actions'


class UpdateSiteNfo extends Component {

    state = {
        formError: false,
        formSuccess:false,
        formdata:{
            address: {
                element: 'input',
                value: '',
                config:{
                    label: 'Address', 
                    name: 'adress_input',
                    type: 'text',
                    placeholder: 'Enter your address'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            hours: {
                element: 'input',
                value: '',
                config:{
                    label: 'Working Hours',
                    name: 'hours_input',
                    type: 'text',
                    placeholder: 'Enter the site working hours'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            phone: {
                element: 'input',
                value: '',
                config:{
                    label: 'phone',
                    name: 'phone_input',
                    type: 'text',
                    placeholder: 'Enter the Phone for site'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },

            email: {
                element: 'input',
                value: '',
                config:{
                    label: 'Email',
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation:{
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            }
        }
    }

    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'update_user');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    submitForm= (event) =>{
        event.preventDefault();
        
        let dataToSubmit = generateData(this.state.formdata,'update_user');
        let formIsValid = isFormValid(this.state.formdata,'update_user')

        if(formIsValid){
            console.log(dataToSubmit)
            this.props.dispatch(updateSiteData(dataToSubmit)).then(()=>{
                this.setState({
                    formSuccess: true
                },()=>{
                    setTimeout(()=>{
                        this.setState({
                            formSuccess:false
                        })
                    },2000)
                })
            })
            
        } else {
            this.setState({
                formError: true
            })
        }
   

    }

    componentDidMount(){
        this.props.dispatch(getSiteData()).then(() => {
            console.log(this.props.site.siteData[0])
            const newFormdata = populateFields(this.state.formdata, this.props.site.siteData[0]);
            this.setState({
                formdata: newFormdata
            })
        })
        
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => this.SubmitForm(event)}>
                    <h1>Site Information</h1>
                    <FormField
                        id={'address'}
                        formdata={this.state.formdata.address}
                        change={(element) => this.updateForm(element)}
                    />
                    <FormField
                        id={'hours'}
                        formdata={this.state.formdata.hours}
                        change={(element) => this.updateForm(element)}
                    />

                    <FormField
                        id={'phone'}
                        formdata={this.state.formdata.phone}
                        change={(element) => this.updateForm(element)}
                    />
                    <FormField
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={(element) => this.updateForm(element)}
                    />
                    <div className="">
                        {
                            this.state.formSuccess ?
                                <div className="form_success">Success</div>
                                : null
                        }
                        {this.state.formError ?
                            <div className="error_label">
                                Please check your data
                                            </div>
                            : null}
                        <button onClick={(event) => this.submitForm(event)}>
                            Update Site Info
                    </button>
                    </div>

                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        site: state.site
    }
}

export default connect(mapStateToProps)(UpdateSiteNfo);