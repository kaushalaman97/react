import React from 'react'
import { connect } from "react-redux";
import { Container, Row, Col, Form, Input, Nav, NavItem, BreadcrumbItem, Breadcrumb } from 'reactstrap';
import { Link, Route } from 'react-router-dom';
import AdminNavbar from '../../../../../javascript/src/components/Navbars/AdminNavbar'
import { StartCampaignAction } from "../../../redux/action/CampaignAction";
import { MailGetDataAction } from '../../../redux/action/MailSenderAction';
class NewCampaign_start extends React.Component {
    constructor(props) {
        super(props);
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var now = new Date();
        var thisMonth = months[now.getMonth()];
        const date = thisMonth + ' ' + now.getDate() + " Outreach";
        this.state = {
            title: date,
            from_address: '',
            mailsExist: null
        }
    }
    handleChange = (e) => {
        console.log(e.target.name, e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    componentDidMount() {
        this.props.MailGetDataAction();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            title: this.state.title,
            from_address: this.state.from_address
        }
        this.props.StartCampaignAction(data)
    }

    static getDerivedStateFromProps(props, state) {
        if (props.mailGetData && props.mailGetData[0] && props.mailGetData[0].id && !state.mailsExist) {
            console.log('Call')
            return {
                from_address: props.mailGetData && props.mailGetData[0].id,
                mailsExist: true
            }
        }
        if (props.mailGetData && !props.mailGetData.length) {
            alert('Please go to create mail account');
            return {
                mailsExist: false
            }
        }
        return null
    }

    componentWillReceiveProps(preProps, nextProps) {
        console.log({
            preProps, nextProps
        })
    }
    render() {
        const { mailGetData } = this.props;
        console.log('from_address', this.state.from_address)
        const { mailsExist } = this.state;
        return (
            <div className='main-view'>
                <AdminNavbar />
                <Nav className='mx-auto navLink'  role='tablist'>
                    <NavItem className='mr-3 ml-3'>
                        <Link to="/app/admin/CampaignStart">START</Link>
                    </NavItem>
                    <NavItem className='mr-3 ml-3'>
                        <Link to={{
                            pathname: "/app/admin/CampaignRecipient",
                            state: {
                                id: this.props.history.location.state && this.props.history.location.state.id
                            }
                        }}>RECIPICIENT</Link>
                    </NavItem>
                    <NavItem className='mr-3 ml-3'>
                        <Link to={{
                            pathname: "/app/admin/CampaignCompose",
                            state: {
                                mailGetData: this.props.mailGetData
                            }
                        }}>COMPOSE</Link>
                    </NavItem>
                    <NavItem className='mr-3 ml-3'>
                        <Link to={{
                            pathname: "/app/admin/CampaignPreview",
                            state: {
                                id: this.props.history.location.state && this.props.history.location.state.id
                            }
                        }}>PREVIEW</Link>
                    </NavItem>
                    <NavItem className='mr-3 ml-3'>
                        <Link to={{
                            pathname: "/app/admin/CampaignOptions",
                            state: {
                                id: this.props.history.location.state && this.props.history.location.state.id
                            }
                        }}>OPTIONS</Link>
                    </NavItem>
                    <NavItem className='mr-3 ml-3'><Link to={{
                        pathname: "/app/admin/CampaignSend",
                        state: {
                            id: this.props.history.location.state && this.props.history.location.state.id
                        }
                    }}>SEND</Link>
                    </NavItem>
                </Nav>
                <Container fluid className="w-100">
                    {/* <Row style={{ width: '100%', borderBottom: "1px solid #dedede", color: 'white' }}>
                        <Col style={{ display: 'flex', alignItems: 'center' }}>
                            <div className='logo_div' style={{ display: 'flex', alignItems: 'center' }}>
                                <div><img src={STATIC_FILES.mailsaas_logo_32}></img>
                                    <span style={{ color: 'black', fontSize: '20px' }}>MailSaaaS</span></div>
                            </div>
                        </Col>
                        <Col >
                            <h1 style={{ textAlign: 'center', fontSize: '60px', color: "#333333" }}>New Campaign</h1>
                        </Col>
                        <Col style={{ display: "flex", flexDirection: "row-reverse" }}>
                            <div className='mt-3'>
                                <a href='' onClick={(e) => { e.preventDefault(); alert('msg') }}>
                                    <span><i className="fa fa-question-circle-o fa-lg" aria-hidden="true"></i></span>
                                </a>
                            </div>
                        </Col>
                    </Row> */}
                    {/* <Row>
                        <Col style={{ display: "flex" }}> */}
                    {/* <Nav className='mx-auto w-100' navbar> */}
                    {/* <Row> */}

                    {/* </Row> */}
                    {/* </Nav> */}
                    {/* </Col>
                    </Row> */}
                    <Row >
                        <Col md={6} className='mx-auto mt-5'>
                            <Form onSubmit={this.handleSubmit}>
                                <Row style={{ display: 'flex', justifyContent: 'center' }} >
                                    <h1 style={{ fontSize: '30px', textAlign: 'center', color: "#333333" }}> Let's get started</h1>
                                </Row>
                                <Row className='mt-5'>
                                    <div style={{ width: '100%' }}> <label>Title (for your team's eyes only)</label><br></br>
                                        <input type='text' name='title' value={this.state.title} onChange={this.handleChange} className='start_input' autoComplete="off" placeholder={this.state.date} required></input></div>
                                </Row>
                                <Row className='mt-5'>
                                    <div style={{ width: '100%' }}><label >From Address</label><br></br>
                                        <Input required type="select" name='from_address' value={this.state.from_address} onChange={this.handleChange} id="exampleSelect" >
                                            <option value={''}>Select</option>
                                            {

                                                mailGetData && mailGetData.map((item, index) => {
                                                    return <option key={index} value={item.id}>{item.email}</option>
                                                })
                                            }
                                        </Input>
                                    </div>
                                </Row>
                                <Row className='mt-5'>
                                    <Col style={{ display: "flex", justifyContent: "center" }}>
                                        <button disabled={!mailsExist} type='submit' className='btn startBtn'>Next <i className="fas fa-angle-right"></i>
                                        </button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
                {/* </div> */}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    // console.log("------------------------->",state.MailGetDataReducer.mailGetData&&state.MailGetDataReducer.mailGetData.map((e,i)=> e.email[0].id))
    return {
        mailGetData: state.MailGetDataReducer.mailGetData && state.MailGetDataReducer.mailGetData
    };
};
const mapDispatchToProps = dispatch => ({
    StartCampaignAction: (data) => { dispatch(StartCampaignAction(data)) },
    MailGetDataAction: mailGetData => { dispatch(MailGetDataAction(mailGetData)) },
});
export default connect(mapStateToProps, mapDispatchToProps)(NewCampaign_start)
