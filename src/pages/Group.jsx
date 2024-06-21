import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { alertActions } from '../redux/AlertController'
import { FaCheck, FaKey } from 'react-icons/fa'
import { IoIosRemove, IoMdAdd } from "react-icons/io";
import '../styles/group.scss'
import { cartActions } from '../redux/CartController'
import { LuClipboardList } from "react-icons/lu";


const Group = () => {
  const { _id } = useParams()
  const [channel,setChannel] = useState(null)
  const { token } = useSelector(state => state.userController)

  const dispatch = useDispatch();
  const { items,isUserLoggedIn } = useSelector(state => state.cartController)
  const { addItem,removeItem,switchPeriod } = cartActions

  const isIncluded = (periodName) => {
    if(isUserLoggedIn){
      return items.filter(e => (e.groupId === _id && e.periodName === periodName)).length > 0
    }else {
      return items.filter(e => (e._id === _id && e.periodName === periodName)).length > 0
    }
  }

  const toggleItem = (periodIndex,periodName,periodPrice,periodInDays) => {
    const exists = isIncluded(periodName)
    
    if(isUserLoggedIn){
      const sameG = items.filter(e => (e.groupId === _id)).length > 0
      if(exists){
        fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/remove-item`,{
          method:'DELETE',
          body:JSON.stringify({groupId:_id,periodIndex}),
          headers: {
            'Content-Type': 'application/json',
            'authorization': `bearer ${token}`
          }
        })
        .then(res => res.json())
        .then(json => {
          dispatch(removeItem(json.deletedItem))
        })
        .catch(err => dispatch(alertActions.showError({msg:err.message})))
      }else if(sameG){
        fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/update-item`,{
          method:'PUT',
          body:JSON.stringify({groupId:_id,periodIndex}),
          headers: {
            'Content-Type': 'application/json',
            'authorization': `bearer ${token}`
          }
        })
        .then(res => res.json())
        .then(json => {
          dispatch(switchPeriod(json.updatedItem))
        })
        .catch(err => dispatch(alertActions.showError({msg:err.message})))
      } else {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/add-item`,{
          method:'POST',
          body:JSON.stringify({groupId:_id,periodIndex}),
          headers: {
            'Content-Type': 'application/json',
            'authorization': `bearer ${token}`
          }
        })
        .then(res => res.json())
        .then(json => {
          dispatch(addItem(json.newItem))
        })
        .catch(err => dispatch(alertActions.showError({msg:err.message})))
      }
    }else {
      if(exists){
        dispatch(removeItem(channel))
      }else {
        dispatch(addItem({...channel,groupId:channel._id,periodName,periodPrice,periodInDays}))
      }
    }
  }
  
  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_BASE_URL}/home-page/get-single-group/${_id}`)
    .then(res => res.json())
    .then(json => setChannel(json.groub))
    .catch(err => dispatch(alertActions.showError({msg:err.message})))
  },[])

  let p1DayPrice = channel?.periods[0].periodPrice / channel?.periods[0].periodInDays
  let p2AsP1Price =  p1DayPrice * channel?.periods[1].periodInDays
  let p2PriceDef = p2AsP1Price - channel?.periods[1].periodPrice
  let percentageP2 = ((p2PriceDef / p2AsP1Price) * 100).toFixed(1)

  let p3AsP1Price =  p1DayPrice * channel?.periods[2].periodInDays
  let p3PriceDef = p3AsP1Price - channel?.periods[2].periodPrice
  let percentageP3 = ((p3PriceDef / p3AsP1Price) * 100).toFixed(1)
  return (
    <section className='group'>
      <article className='benifets'>
        <img className='channel-image' src={channel?.groupImageUrl} alt="" />
        <h2 className='bn-heading TXT-heading2'>
          <span className='icon TXT-heading'>
            {LuClipboardList({})}
          </span>
          المــــــــــيــــزات
        </h2>
        <ul className='bn-list' role='list'>
          {channel?.features.map((e,i)=><li key={i} style={{'--d':`${(i*0.1) + 0.4}s`}}>
            <span className='icon TXT-heading2'>{FaCheck({})}</span>
            <p className='txt TXT-normal'>
              {e}
            </p>
          </li>)
          }
        </ul>
      </article>
      <article className='plans-article'>
        <div className='group-heading'>
          <img className='group-icon' src={channel?.groupIconUrl} alt="" />
          <h2 className='group-name TXT-heading2'>
            {channel?.name}
          </h2>
          <p className='desc TXT-normal'>
            {channel?.description}
          </p>
        </div>
        {channel?.isLifeTime ?
          <>
            <h2 className='select-heading'>
              <span className='icon TXT-heading2'>
                {FaCheck({})}
              </span>
              الخيار المناسب!
            </h2>
            <ul className='plans' role='list'>
              <li className={`card ${isIncluded('مدى الحياة') && 'included'}`} style={{'--d':'0.8s'}} onClick={()=>toggleItem(0,'مدى الحياة',channel?.lifeTimePrice)}>
                <p className='price'> 
                  <span className='usdt TXT-heading2'>${channel?.lifeTimePrice}</span>
                  <span className='period TXT-footer'>\ مدى الحياة </span>
                </p>
                <h2 className='card-heading'> اشتراك دائم! </h2>
                <div className='period-desc'>
                  <span className='icon TXT-heading3'>{FaCheck({})}</span>
                  <p className='txt TXT-footer'>
                    {channel?.lifeTimeDesc}
                  </p>
                </div>
                {isIncluded('مدى الحياة')?
                <button className='add-icon re-btn TXT-heading'>
                  {IoIosRemove({})}
                </button>
              :
                <button className='add-icon TXT-heading'>
                  {IoMdAdd({})}
                </button>
              }
              </li>
            </ul>
          </>
        :
          <>
            <h2 className='select-heading'>
              <span className='icon TXT-heading2'>
                {FaCheck({})}
              </span>
              اختر الخطة المناسبة!
            </h2>
            <ul className='plans' role='list'>
              <li className={`card ${isIncluded(channel?.periods[0].periodName) && 'included'}`} style={{'--d':'0.8s'}} onClick={()=>toggleItem(0,channel?.periods[0].periodName,channel?.periods[0].periodPrice,channel?.periods[0].periodInDays)}>
                <p className='price'> 
                  <span className='usdt TXT-heading2'>${channel?.periods[0].periodPrice}</span>
                  <span className='period TXT-footer'>\ {channel?.periods[0].periodInDays} يوم</span>
                </p>
                <h2 className='card-heading'> {channel?.periods[0].periodName} </h2>
                <div className='period-desc'>
                  <span className='icon TXT-heading3'>{FaCheck({})}</span>
                  <p className='txt TXT-footer'>
                    {channel?.periods[0].periodDesc}
                  </p>
                </div>
                {isIncluded(channel?.periods[0].periodName)?
                  <button className='add-icon re-btn TXT-heading'>
                    {IoIosRemove({})}
                  </button>
                :
                  <button className='add-icon TXT-heading'>
                    {IoMdAdd({})}
                  </button>
                }
              </li>
              <li className={`card ${isIncluded(channel?.periods[1].periodName) && 'included'}`} style={{'--d':'0.9s'}} onClick={()=>toggleItem(1,channel?.periods[1].periodName,channel?.periods[1].periodPrice,channel?.periods[1].periodInDays)}>
                <p className='savings TXT-footer'>
                  <span> 
                  وفر {percentageP2}% 
                  </span>
                </p>
                <p className='price'> 
                  <span className='usdt TXT-heading2'>${channel?.periods[1].periodPrice}</span>
                  <span className='period TXT-footer'>\ {channel?.periods[1].periodInDays} يوم</span>
                </p>
                <h2 className='card-heading'> {channel?.periods[1].periodName} </h2>
                <div className='period-desc'>
                  <span className='icon TXT-heading3'>{FaCheck({})}</span>
                  <p className='txt TXT-footer'>
                    {channel?.periods[1].periodDesc}
                  </p>
                </div>
                {isIncluded(channel?.periods[1].periodName)?
                  <button className='add-icon re-btn TXT-heading'>
                    {IoIosRemove({})}
                  </button>
                :
                  <button className='add-icon TXT-heading'>
                    {IoMdAdd({})}
                  </button>
                }
              </li>
              <li className={`card ${isIncluded(channel?.periods[2].periodName) && 'included'} super`} style={{'--d':'1.0s'}} onClick={()=>toggleItem(2,channel?.periods[2].periodName,channel?.periods[2].periodPrice,channel?.periods[2].periodInDays)}>
                <p className='savings TXT-footer'>
                  <span> 
                  وفر {percentageP3}% 
                  </span>
                </p>
                <p className='price'> 
                  <span className='usdt TXT-heading2'>${channel?.periods[2].periodPrice}</span>
                  <span className='period TXT-footer'>\ {channel?.periods[2].periodInDays} يوم</span>
                </p>
                <h2 className='card-heading'> {channel?.periods[2].periodName} </h2>
                <div className='period-desc'>
                  <span className='icon TXT-heading3'>{FaCheck({})}</span>
                  <p className='txt TXT-footer'>
                    {channel?.periods[2].periodDesc}
                  </p>
                </div>
                {isIncluded(channel?.periods[2].periodName)?
                  <button className='add-icon re-btn TXT-heading'>
                    {IoIosRemove({})}
                  </button>
                :
                  <button className='add-icon TXT-heading'>
                    {IoMdAdd({})}
                  </button>
                }
              </li>
            </ul>
          </>
        }
      </article>
    </section>
  )
}

export default Group