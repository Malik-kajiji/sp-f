import React, { useState, useEffect } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';

const SubsComp = ({ e, i }) => {
  const { groupImageUrl, groupName, isAboutToEnd, isEnded, endDate } = e;
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);

  useEffect(() => {
    if (!isEnded) {
      const interval = setInterval(() => {
        calculateRemainingTime();
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isEnded]);

  const calculateRemainingTime = () => {
    const now = new Date().getTime();
    const endDateTime = new Date(endDate).getTime();
    const remainingTime = endDateTime - now;

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    setDays(days);
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  };
  if(endDate){
      return (
        <li className="sub" key={i}>
          <div className="TXT-heading3 channel">
            <img className="channel-image" src={groupImageUrl} alt="" />
            <p className="name">{groupName}</p>
          </div>
          {isEnded ? (
            <div className="left-time ended">
              <h2 className="time secs">
                <span className="name TXT-footer">الثواني</span>
                <p className="value TXT-heading2">{seconds < 10 ? `0${seconds}` : seconds}
                <span className='TXT-heading2'>{HiOutlineDotsVertical({})}</span>
                </p>
              </h2>
              <h2 className="time mins">
                <span className="name TXT-footer">الدقائق</span>
                <p className="value TXT-heading2">{minutes < 10 ? `0${minutes}` : minutes}
                <span className='TXT-heading2'>{HiOutlineDotsVertical({})}</span>
                </p>
              </h2>
              <h2 className="time hours">
                <span className="name TXT-footer">الساعات</span>
                <p className="value TXT-heading2">{hours < 10 ? `0${hours}` : hours}
                <span className='TXT-heading2'>{HiOutlineDotsVertical({})}</span>
                </p>
              </h2>
              <h2 className="time">
                <span className="name TXT-footer">الأيامات</span>
                <p className="value TXT-heading2 op0">{days < 10 ? `0${days}` : days}
                <span className='TXT-heading2 op0'>{HiOutlineDotsVertical({})}</span>
                </p>
              </h2>
            </div>
          ) : (
            <div className={`left-time ${isAboutToEnd && 'about'}`}>
              <h2 className="time secs">
                <span className="name TXT-footer">الثواني</span>
                <p className="value TXT-heading2">{seconds < 10 ? `0${seconds}` : seconds}
                <span className='TXT-heading2'>{HiOutlineDotsVertical({})}</span>
                </p>
              </h2>
              <h2 className="time mins">
                <span className="name TXT-footer">الدقائق</span>
                <p className="value TXT-heading2">{minutes < 10 ? `0${minutes}` : minutes}
                <span className='TXT-heading2'>{HiOutlineDotsVertical({})}</span>
                </p>
              </h2>
              <h2 className="time hours">
                <span className="name TXT-footer">الساعات</span>
                <p className="value TXT-heading2">{hours < 10 ? `0${hours}` : hours}
                <span className='TXT-heading2'>{HiOutlineDotsVertical({})}</span>
                </p>
              </h2>
              <h2 className="time">
                <span className="name TXT-footer">الأيامات</span>
                <p className="value TXT-heading2 op0">{days < 10 ? `0${days}` : days}
                <span className='TXT-heading2 op0'>{HiOutlineDotsVertical({})}</span>
                </p>
              </h2>
            </div>
          )}
          {isEnded ?
            <div className="isActive">
              <button className="TXT-heading3 not">غير فعالة</button>
            </div>
          :
            <div className="isActive">
              <button className="TXT-heading3">فعالة</button>
            </div>
          }
        </li>
      );
    }else {
      return (
        <li className="sub" key={i}>
          <div className="TXT-heading3 channel">
            <img className="channel-image" src={groupImageUrl} alt="" />
            <p className="name">{groupName}</p>
          </div>
            <div className="left-time">
                <h2 className='foreverTXT TXT-heading3'>
                    مدى الحياة
                </h2>
            </div>
          <div className="isActive">
            <button className="TXT-heading3">فعالة</button>
          </div>
        </li>
      );

  }
};

export default SubsComp;