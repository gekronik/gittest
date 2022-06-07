import React from "react";

import './UserCard.scss'

export default class UserCard extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
          currentUserCard: props.userCard,
          isInEdit: false,
        };
    }

    setCurrentUserCard = () => {
      const {userCard} = this.props;
      const stringUserCard = JSON.stringify(userCard);

      const currentUserCard = JSON.parse(stringUserCard);

      this.setEditMode(currentUserCard);
    }

    setEditMode = (currentUserCard) => {
      const {isInEdit} = this.state;

      this.setState({
        isInEdit: !isInEdit,
        currentUserCard
      })
    }

    setPropsUserCard = () => {
      const {userCard} = this.props;

      const currentUserCard = userCard;

      this.setEditMode(currentUserCard);
    }

    // fullNameChange = (event) => { изменяет конкретное поле fullName => заменена на оптимизированную функцию setUserValueByKey
    //   const {value} = event.target;
    //   const {currentUserCard} = this.state;

    //   this.setState({
    //     currentUserCard: {
    //       ...currentUserCard,
    //       fullName: value,
    //     }
    //   })
    // }

    setUserValueByKey = (event, key) => { // key - строка (смотри работу с объектами)
      const {value} = event.target;
      const {currentUserCard} = this.state;

      this.setState({
        currentUserCard: {
          ...currentUserCard,
          [key]: value,
        }
      })
    }

    saveChanges = () => {
      const {currentUserCard} = this.state;

      this.setEditMode(currentUserCard);
      this.props.changeUserData(currentUserCard)
    } 

    
   
render() {
  const {closeCard} = this.props;
  const {
    currentUserCard: {
      fullName,
      passport,
      position,
      transportNum,
      status
  }, 
  isInEdit
} = this.state;

  return (
    <div className='user-card'>
      <div className="navigation">
        <button onClick={closeCard}>
          Назад
        </button>
        {
          isInEdit ?
          <div>
            <button onClick={this.setPropsUserCard}>
              Отменить
            </button>
            <button onClick={this.saveChanges}>
              Сохранить
            </button>
          </div>
         :
         <button onClick={this.setCurrentUserCard}>
            Редактировать
          </button>

           }

         
           { 
           status === 'await' ?
           <div>
      <button>принять</button>
      <button>отказать</button>
          </div>
          :
          status === "in" ?
          <div>
          <button>выпустить</button>
          </div>
          :
          status ==='refusal'?
          <div>
          <button>принять</button>
          </div>
          :
          null
          
        }
                                   
               
      </div>
      <div className="data">
      <div className='fullname'>
       <strong>ФИО:</strong>
       {
         isInEdit ?
          <input 
            value={fullName} 
            onChange={(event) => this.setUserValueByKey(event, 'fullName')}
         /> 
         :
         fullName
       } 

      </div>
      <div className='passport'>
     <strong>паспортные данные:</strong>  
     {
         isInEdit ?
          <input 
            value={passport} 
            onChange={(event) => this.setUserValueByKey(event, 'passport')}
         /> 
         :
         passport
    }
    </div>
    <div className='position'>
    <strong>должность:</strong>  
    {
         isInEdit ?
          <input 
            value={position} 
            onChange={(event) => this.setUserValueByKey(event, 'position')}
         /> 
         :
         position
    }
    </div>
    <div className='transportNum'>
    <strong>номер транспорта:</strong>
    {
         isInEdit ?
          <input 
            value={transportNum} 
            onChange={(event) => this.setUserValueByKey(event, 'transportNum')}
         /> 
         :
         transportNum
    }
    </div>
      </div>
  
    </div>
  )
}
}
