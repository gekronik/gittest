import React from "react";

import UserContainer from '../UserContainer/userContainer';
import './applicationContainer.scss';

export default class ApplicationContainer extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        const {
            application: {
                title,
                opened,
            },
            users,
            index,
            changeApplicationVisible,
            setUserCard
        } = this.props;

        return (
            <div className='category'>
                <div
                    className='header'
                    onClick={() => changeApplicationVisible(index)}
                >
                    {title}
                </div>
                <div className={`body${opened ? ' opened' : '' }`} >
                    {
                        opened ?
                            <div className='users-list'>
                                {users.map(user => {
                                    return (
                                        <UserContainer
                                            key={user.id}
                                            user={user}
                                            setUserCard={setUserCard}
                                        />
                                    )
                                })}
                            </div>
                            : null
                    }
                </div>
            </div>
        )
    }
}
