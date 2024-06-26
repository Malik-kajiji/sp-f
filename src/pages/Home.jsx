import React, { useEffect, useState } from 'react'
import '../styles/home.scss'
import { RiGraduationCapFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { HiOutlineArrowLongDown } from "react-icons/hi2";
import { useDispatch,useSelector } from 'react-redux'
import { alertActions } from '../redux/AlertController';
import { Link } from 'react-router-dom';


const Home = () => {
  const dispatch = useDispatch()
  const [groups,setGroups] = useState([])

  const [activeSection, setActiveSection] = useState([]);
  const [sectionHeights,setSectionsHeights] = useState({
    section1:0,
    section2:0,
    section3:0,
    section4:0,
    section5:0
  })

  useEffect(() => {
    //to get heights
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
  
      if(scrollPosition >= 0 && scrollPosition <= sectionHeights.section2){
        setActiveSection(prev => prev.length === 0 ? ['section1']:prev)
      }else if(scrollPosition > sectionHeights.section2 && scrollPosition <= sectionHeights.section3){
        setActiveSection(prev => prev.length === 1 ? ['section1','section2']:prev)
        // setActiveSection(['section1','section2'])
      }else if(scrollPosition > sectionHeights.section3 && scrollPosition <= sectionHeights.section4){
        setActiveSection(prev => prev.length === 2 ? ['section1','section2','section3']:prev)
        // setActiveSection(['section1','section2','section3'])
      }else if(scrollPosition > sectionHeights.section4 && scrollPosition <= sectionHeights.section5) {
        setActiveSection(prev => prev.length === 3 ? ['section1','section2','section3','section4']:prev)
        // setActiveSection(['section1','section2','section3','section4'])
      }else {
        setActiveSection(prev => prev.length === 4 ? ['section1','section2','section3','section4','section5']:prev)
        // setActiveSection(['section1','section2','section3','section4','section5'])
      }
    };
    //to get heights
    handleResize()
    handleScroll()
    // Add event listener to handle scroll
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionHeights.section2]);

  const handleResize = () => {
    const s1 = document.getElementById('section1').offsetTop - (document.getElementById('section1').offsetTop * 0.3);
    const s2 = document.getElementById('section2').offsetTop - (document.getElementById('section2').offsetTop * 0.5);
    const s3 = document.getElementById('section3').offsetTop - (document.getElementById('section3').offsetTop * 0.2);
    const s4 = document.getElementById('section4').offsetTop - (document.getElementById('section4').offsetTop * 0.2);
    const s5 = document.getElementById('section5').offsetTop - (document.getElementById('section5').offsetTop * 0.2);

    setSectionsHeights({section1:s1,section2:s2,section3:s3,section4:s4,section5:s5})
  }

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_BASE_URL}/home-page/get-all-groups`)
    .then(res => res.json())
    .then(json => {
      setGroups(json.allGroubs)
    })
    .catch(err => {
      dispatch(alertActions.showError({msg:err.message}))
    })
  },[])
  return (
    <section className='home'>
      <div id="section1" className={`landing-page ${activeSection.includes('section1') ? 'active' : ''}`}>
        <h2 className='logo-txt TXT-logo'>SPACE TECH</h2>
        <div className='description TXT-normal'>
          <p style={{'--d':'0.5s'}}>
            مرحبًا بك في <b> Space tech. </b>
            المنصة التعليمية الرائدة في مجال <b>التداول المالي</b>
          </p>
          <br />
          <p style={{'--d':'0.6s'}}>
            نقدم لك مجموعة واسعة من التوصيات و الكورسات <b>والبرامج التعليمية</b> التي تناسب جميع مستويات الخبرة
          </p>
          <br />
          <p style={{'--d':'0.7s'}}>
          سواء كنت مبتدئًا  في عالم التداول أو محترفًا تسعى لتطوير مهاراتك، <b>ستجد عندنا ما يناسبك</b>
          </p>
        </div>
        <div className='over-lay'></div>
      </div>
      <article id="section2" className={`second-article ${activeSection.includes('section2') ? 'active' : ''}`}>
          <div className='container art-container'>
            <div className='second-art-holder'>
              <img className='btc-image' src="/images/colored-btc.png" alt="" />
              {/* <img className='btc-image' src="/images/btc-image.png" alt="" /> */}
              <h2 className='first-txt TXT-heading2'>خيارك الأفضل للتداول</h2>
              <span className='icon'>{HiOutlineArrowLongDown({})}</span>
              <h2 className='logo-txt TXT-heading'>Space Tech</h2>
              <img className='logo-image' src="/images/3d-logo.png" alt="" />
              {/* <img className='logo-image' src="/images/space-tech-logo.png" alt="" /> */}
              <p className='intro-txt TXT-normal'>نقدم لكم</p>
              <h2 className='TXT-heading no-1'>
                المنصة الأولى على <br />
                <b>ليبيا</b>
              </h2>
              <img className='line-image' src="/images/line-image.png" alt="" />
              <div className='txt-underline TXT-heading3'>
                <p style={{'--d':'1.1s'}}>أفضل منصة رائدة في <b>مجال التداول</b> على مستوى ليبيا</p>
                
                <p style={{'--d':'1.2s'}}>
                  <b> "سبيس تيك“ </b> 
                  يتميز فريقنا 
                  بالخبرة و <b>الأساليب التعليمية</b> الفريدة في مجال التداول
                </p>
              </div>
              <div className='the-two-images'>
                <img className='phone-image' src="/images/phone-image-2.png" alt="" />
                <img className='monitor-chart' src="/images/monitor-2.png" alt="" />
                {/* <img className='monitor-chart' src="/images/monitor.png" alt="" /> */}
              </div>
            </div>
          </div>
      </article>
      <article id="section3" className={`first-article  ${activeSection.includes('section3') ? 'active' : ''}`}>
        <div className='container art-container'>
          <div className='first-art-holder'>
            <img className='candles-image' src="/images/candles-image.png" alt="" />
            <div className='line'></div>
            <div className='lessons-list'>
                <h2 className='list-heading TXT-heading2'>
                  <div className='icon-holder no-b'>
                    <img src="/images/access-icon.png" className='icon' alt="" />
                  </div>
                  <p>Access to trading team</p>
                </h2>
                <ul className='points' role='list'>
                  <li style={{'--d':'0.2s'}}>
                    <span className='icon TXT-heading2'>{FaCheck({})}</span>
                    <p className='txt TXT-normal'>
                      <span className='b-txt'>الدقة الموثوقة </span>
                      <span className='r-txt'>والاحترافية في التوصيات VIP </span>
                    </p>
                  </li>
                  <li style={{'--d':'0.3s'}}>
                    <span className='icon TXT-heading2'>{FaCheck({})}</span>
                    <p className='txt TXT-normal'>
                      <span className='b-txt'>زيادة الايرادات وتكبير رأس </span>
                      <span className='r-txt'>المال بوقت قصير </span>
                    </p>
                  </li>
                  <li style={{'--d':'0.4s'}}>
                    <span className='icon TXT-heading2'>{FaCheck({})}</span>
                    <p className='txt TXT-normal'>
                      <span className='b-txt'>توفير الوقت والجهد </span>
                      <span className='r-txt'>باستخدام التوصيات </span>
                    </p>
                  </li>
                </ul>
            </div>
          </div>
        </div>
      </article>
      <article id="section4" className={`third-article  ${activeSection.includes('section4') ? 'active' : ''}`}>
        <div className='container art-container'>
          <div className='third-art-holder'>
            <div className='article-line'></div>
            <h2 className='article-heading TXT-heading'>
              الخدمات الموجودة
              <br />
              <b>لدينا</b>
            </h2>
            <p className='TXT-normal some-txt'>
              جميع القنوات <b>المتواجدة عندنا</b> تتم 
              ادارتها بأفراد <b>فريقنا</b> اللي 
              خبرة العديد منهم  تزيد عن <b> 5 سنوات </b>  
            </p>
            <ul className='cards-holder' role='list'>
              {groups?.map((e,i)=><Link to={`/group/${e._id}`} key={i}>
                  <li className='card' style={{'--d':`${0.5 + (i * 0.3)}s`}} key={i}>
                  <div className='card-heading-holder'>
                    <img className='groups-icon' src={e.groupIconUrl} alt="" />
                    <h2 className='card-heading TXT-heading2'>
                      {e.name}
                    </h2>
                  </div>
                  <p className='desc TXT-footer'>
                    {e.description}
                  </p>
                  <img className='channel-image' src={e.groupImageUrl} alt="" />
                </li>
              </Link>)
              }
            </ul>
          </div>
        </div>
      </article>
      <article id="section5" className={`first-article flip-dir  ${activeSection.includes('section5') ? 'active' : ''}`}>
      <div className='container art-container'>
          <div className='first-art-holder'>
          <div className='lessons-list'>
              <h2 className='list-heading TXT-heading2'>
                <div className='icon-holder'>
                  <span className='icon'>
                    {RiGraduationCapFill({})}
                  </span>
                </div>
                <p>New App, New Lessons</p>
              </h2>
              <ul className='points' role='list'>
                <li style={{'--d':'0.2s'}}>
                  <span className='icon TXT-heading2'>{FaCheck({})}</span>
                  <p className='txt TXT-normal'>
                    <span className='b-txt'>دورات تعليمية إحترافية </span>
                    <span className='r-txt'> من مدربين خبراء </span>
                  </p>
                </li>
                <li style={{'--d':'0.3s'}}>
                  <span className='icon TXT-heading2'>{FaCheck({})}</span>
                  <p className='txt TXT-normal'>
                    <span className='b-txt'>تطوير المهارات </span>
                    <span className='r-txt'>والمعرفة الشاملة والمكثفة </span>
                  </p>
                </li>
                <li style={{'--d':'0.4s'}}>
                  <span className='icon TXT-heading2'>{FaCheck({})}</span>
                  <p className='txt TXT-normal'>
                    <span className='b-txt'>إحتراف التداول </span>
                    <span className='r-txt'> في وقت مميز ومتابعة الخبراء </span>
                  </p>
                </li>
              </ul>
            </div>
            <div className='line'></div>
            <img className='candles-image' src="/images/ipad-image-4.png" alt="" />
            {/* <img className='candles-image' src="/images/ipad-image.png" alt="" /> */}
          </div>
      </div>
      </article>
    </section>
  )
}

export default Home