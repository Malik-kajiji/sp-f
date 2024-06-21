import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { alertActions } from '../redux/AlertController'
import '../styles/oldGroup.scss'
import { FaCheck, FaUserAlt } from "react-icons/fa";

const OldGroup = () => {
    const { _id } = useParams()
  const [channel,setChannel] = useState(null)

  const dispatch = useDispatch();

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_BASE_URL}/home-page/get-single-group/${_id}`)
    .then(res => res.json())
    .then(json => setChannel(json.groub))
    .catch(err => dispatch(alertActions.showError({msg:err.message})))
  },[])
  return (
    <section className='old-group'>
      <div className='group-image' style={{'backgroundImage':`url(${channel?.groupImageUrl})`}}></div>
      <div className='intro-container-holder'>
        <article className='intro container'>
          <div className='holder'>
            <div className='heading'>
              <img src={channel?.groupIconUrl} alt="" />
              <h2 className='TXT-heading2'>{channel?.name}</h2>
            </div>
            <p className='desc TXT-normal'>
              {channel?.description}
            </p>
            <p className='num TXT-heading3'>
              <span className='icon'>
                {FaUserAlt({})}
              </span>
              1256
            </p>
          </div>
        </article>
      </div>
      <div className='cards-container-holder'>
        <article className='cards container'>
          <ul className='cards-holder'>
            <li className='super-ov'>
              <div className='card super'>
                <h2 className='card-heading'> {channel?.periods[2].periodName} </h2>
                <p className='price'> 
                  <span className='usdt TXT-heading'>${channel?.periods[2].periodPrice}</span>
                  <span className='period TXT-normal'>\ {channel?.periods[2].periodInDays} يوم</span>
                </p>
                <p className='bn-heading TXT-heading2'>المــــــــــيــــزات</p>
                <ul className='bn-list' role='list'>
                  {channel?.features.map((e,i)=><li key={i}>
                    <span className='icon TXT-heading2'>{FaCheck({})}</span>
                    <p className='txt TXT-normal'>
                      {e}
                    </p>
                  </li>)
                  }
                </ul>
                <button className='add-btn TXT-heading3'>
                  أضف إلى العربة
                </button>
              </div>
            </li>
            <li className='card mid'>
            <h2 className='card-heading'> {channel?.periods[1].periodName} </h2>
                <p className='price'> 
                  <span className='usdt TXT-heading'>${channel?.periods[1].periodPrice}</span>
                  <span className='period TXT-normal'>\ {channel?.periods[1].periodInDays} يوم</span>
                </p>
                <p className='bn-heading TXT-heading2'>المــــــــــيــــزات</p>
                <ul className='bn-list' role='list'>
                  {channel?.features.map((e,i)=><li key={i}>
                    <span className='icon TXT-heading2'>{FaCheck({})}</span>
                    <p className='txt TXT-normal'>
                      {e}
                    </p>
                  </li>)
                  }
                </ul>
              {/* <ul className='bn-list' role='list'>
                <li>
                  <span className='icon TXT-heading2'>{FaCheck({})}</span>
                  <p className='txt TXT-normal'>
                    توصيات تداول يومية
                  </p>
                </li>
                <li>
                  <span className='icon TXT-heading2'>{FaCheck({})}</span>
                  <p className='txt TXT-normal'>
                    تحليل فني للسوق
                  </p>
                </li>
                <li>
                  <span className='icon TXT-heading2'>{FaCheck({})}</span>
                  <p className='txt TXT-normal'>
                    تحديثات أخبار السوق
                  </p>
                </li>
                <li>
                  <span className='icon TXT-heading2'>{FaCheck({})}</span>
                  <p className='txt TXT-normal'>
                    دعم عملاء على مدار 24 ساعة
                  </p>
                </li>
              </ul> */}
              <button className='add-btn TXT-heading3'>
                أضف إلى العربة
              </button>
            </li>
            <li className='card normal'>
            <h2 className='card-heading'> {channel?.periods[0].periodName} </h2>
                <p className='price'> 
                  <span className='usdt TXT-heading'>${channel?.periods[0].periodPrice}</span>
                  <span className='period TXT-normal'>\ {channel?.periods[0].periodInDays} يوم</span>
                </p>
                <p className='bn-heading TXT-heading2'>المــــــــــيــــزات</p>
                <ul className='bn-list' role='list'>
                  {channel?.features.map((e,i)=><li key={i}>
                    <span className='icon TXT-heading2'>{FaCheck({})}</span>
                    <p className='txt TXT-normal'>
                      {e}
                    </p>
                  </li>)
                  }
                </ul>
              <button className='add-btn TXT-heading3'>
                أضف إلى العربة
              </button>
            </li>
          </ul>
        </article>
      </div>
    </section>
  )
}

export default OldGroup