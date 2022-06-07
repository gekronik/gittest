import React from "react";

import ApplicationContainer from './ApplicationContainer/ApplicationContainer';
import UserCard from './UserCard/UserCard';


export default class MainContainer extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      title: 'base title',
      users: [
        {
          id: 1231231,
          status: 'await',
          fullName: 'Олег Монгол',
          dateTime: '11.12.2012 23:00',
          position: 'Боец',
          passport: '1234 345345',
          transportNum: 'Волга 2',
        },
        {
          id: 123111111,
          status: 'await',
          fullName: 'Олег Монгол Реальный',
          dateTime: '11.12.2012 23:00',
          position: 'Реальный боец',
          passport: '1234 345345',
          transportNum: 'Волга 1',
        },
        {
          id: 123321323,
          status: 'refusal',
          fullName: 'Сан Саныч',
          dateTime: '11.12.2012 23:00',
          position: 'Дипломат',
          passport: '1234 345345',
          transportNum: 'Волга тоже',
        },
        {
          id: 12353522,
          fullName: 'Сан Саныч Обэмович',
          status: 'refusal',
          dateTime: '11.12.2012 23:00',
          position: 'Сын президента (не дочка - это важно)',
          passport: '1234 345345',
          transportNum: 'Волга опять',
        },
        {
          id: 1234324,
          fullName: 'Балдеж Который',
          status: 'in',
          dateTime: '11.12.2012 23:00',
          position: 'Уволен',
          passport: '2134 234242',
          transportNum: 'ТОЙОТА',
        },
        {
          id: 123,
          fullName: 'Михаил Павлович Тереньтев',
          status: 'await',
          dateTime: '11.12.2012 23:00',
          position: 'Финансист',
          passport: '1234 345345',
          transportNum: 'Нокиа',
        },
        {
          id: 1234,
          fullName: 'Ольга Бузова',
          status: 'in',
          dateTime: '11.12.2012 23:00',
          position: 'Ой блядь',
          passport: '1234 345345',
          transportNum: 'ЧЛЕНИКСЫ',
        },
      ],
      awaitUsers: [],
      inUsers: [],
      refusalUsers: [],
      applications: [
        {
          title: 'Ожидают',
          id: 'await',
          opened: false,
        },
        {
          title: 'На объекте',
          id: 'in',
          opened: false,
        },
        {
          title: 'Не допущены',
          id: 'refusal',
          opened: false,
        },
      ],
      view: 'applications',
      userCard: null,
    };
  }

  componentDidMount() {
    this.sortUsersOnApplications();
  }

  sortUsersOnApplications = () => {
    const {users} = this.state;

    const awaitUsers = users.filter(({status}) => status === 'await');  // деструктурировали объект в массиве, хотим из него параметр status
    const inUsers = users.filter(user => user.status === 'in');
    const refusalUsers = users.filter(user => user.status === 'refusal');

    this.setState({
      awaitUsers,
      inUsers,
      refusalUsers
    })
  }

  changeApplicationVisible = (index) => {
    const { applications } = this.state;

    this.setState({
      applications: applications.map((application, i) => {
        if (i === index) {
          return {
            ...application,
            opened: !application.opened,
          }
        } else {
          return application
        }
      })
    })
  }

  setUserCard = (userCard) => {
       this.setState({
      userCard,
      view: 'userCard'
    })
  }

  closeCard = () => {
    this.setState({
      view: 'applications',
      userCard: null,
    })
  }

  changeUserData = (changedUser) => {
    const {awaitUsers, inUsers, refusalUsers} = this.state;

    const userStatus = changedUser.status;
    const userId = changedUser.id;

    // оптимизировать с помощью switch case

    if (userStatus === 'await') {
      const index = awaitUsers.findIndex(({id}) => id === userId);  // почитать про findIndex
      awaitUsers.splice(index, 1, changedUser);  // почитать про splice

      this.setState({
        awaitUsers
      })

      return;
    }

    if (userStatus === 'in') {
      const index = inUsers.findIndex(({id}) => id === userId);
      inUsers.splice(index, 1, changedUser);

      this.setState({
        inUsers
      })

      return;
    }

    if (userStatus === 'refusal') {
      const index = refusalUsers.findIndex(({id}) => id === userId);
      refusalUsers.splice(index, 1, changedUser);

      this.setState({
        refusalUsers
      })
    }

    // this.setState({
    //   applications: applications.map(application => {
    //     return {
    //       ...application,
    //       users: application.users.map(user => {
    //         if (user.id === changedUser.id) {
    //           return changedUser;
    //         } else {
    //           return user
    //         }
    //       })
    //     }
    //   }),
    // })
  }

  render()
  {
    const {
      applications,
      view,
      userCard,
      awaitUsers,
      inUsers,
      refusalUsers
    } = this.state;

    return (
      <div className="empty-container">
        {
          view === 'applications' ?
          applications.map((application, index) => {
            const users = application.id === 'await' ?
                awaitUsers :
                application.id === 'in' ?
                    inUsers :
                    application.id === 'refusal' ?
                        refusalUsers : []
            return (
                <ApplicationContainer
                    key={application.id}
                    application={application}
                    users={users}
                    index={index}
                    changeApplicationVisible={this.changeApplicationVisible}
                    setUserCard={this.setUserCard}
                />
            )
             })
              : undefined
        }
        {
          view === 'userCard' ?
           <UserCard
             userCard={userCard}
             closeCard={this.closeCard}
             changeUserData={this.changeUserData}
           />
              : undefined
        }
      </div>
    )
  };
}
