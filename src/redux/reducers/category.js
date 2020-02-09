import { GET_CATEGORIES_SUCCESS,POST_ADD_DATA,UPDAT_ECATEGORYA_SYNC,POST_DEL_DATA,UPDATA_DEL_DATA } from '../action-types/user';

//存储状态
const categories = function (prevState = [],action) {
  //加工
  switch(action.type) {
    case GET_CATEGORIES_SUCCESS:
      return action.data;
    case POST_ADD_DATA:
      return [...prevState,action.data];
    case UPDAT_ECATEGORYA_SYNC:
      return prevState.map( (item) => {
        if(item.id === action.data._id) {
          return action.data
        }
        return item
      })
    case POST_DEL_DATA:
      let arr = [...prevState]
      arr.forEach( (item,index) => {
        if (item._id === action.data) {
          arr.splice(index,1)
        }
      })
      return arr
    case UPDATA_DEL_DATA:
      return prevState.map( (role) => {
        if (role._id === action.data._id) {
          return action.data
        }
        return role
      })
    default:
      return prevState
  }
}

export default categories