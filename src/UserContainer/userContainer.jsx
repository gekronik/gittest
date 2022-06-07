import React from "react";




import './userContainer.scss'

export default class UserContainer extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    openUser = () => {
       const currentUser = this.props.user;

       this.props.setUserCard(currentUser);
    }

    render() {
        const {
            user: {
                fullName,
                dateTime,
            },
        } = this.props;

        return (
            <div
                className='user'
                onClick={() => this.openUser()}
            >
                <div className='name'>
                    {fullName}
                </div>
                <div className='about'>
                    {dateTime}
                </div>
            </div>
        )
    }
}
