import { useState } from 'react'
import './style/ProfileScreen.css'
import PostDetail from '../components/PostDetail/PostDetail'
import { UserData, UserPosts, UserVideos } from '../components/PostDetail/PostMockData';


const contentType = {
  post: {
    code: "POSTS",
    name: "POSTS"
  },
  video: {
    code: "VIDEOS",
    name: "VIDEOS"
  }
}

function ProfileScreen(props) {
  const [userData, setUserData] = useState(UserData);
  const [userMediaDisplay, setUserMediaDisplay] = useState(UserPosts);
  const [navOptionArr, setNavOptionArr] = useState(contentType.post.code);
  const [showPostDetail, setShowPostDetail] = useState(false);
  const [chosenPostId, setChosenPostId]= useState(0); 

  const LoadContent = (type) => {
    switch(type){
      case contentType.post.code : setUserMediaDisplay(UserPosts) ; break
      case contentType.video.code : setUserMediaDisplay(UserVideos) ; break
      default : setUserMediaDisplay(UserPosts) ; break
    }
  }

  console.log(chosenPostId);
  return (
    <div>
      <PostDetail visible={showPostDetail} onHideCallBack={() => setShowPostDetail(false)} postId={chosenPostId} user={userData}></PostDetail>
      <div
        className="container"
      >

        <div className='row d-flex justify-content-center pt-5'>

          <div className='col-md-3'>
            <div className="App">
              <AvatarDiv image={userData.avatar} />
            </div>
          </div>

          <div className="col-md-5 d-flex flex-column" style={{ gap: 20 }}>

            <div className='name-field d-flex flex-row align-content-center' style={{ gap: 10 }}>
              <h5>{userData.username}</h5>
              <ButtonWeb title={"Edit profile"}></ButtonWeb>
              <ButtonWeb title={"View archive"}></ButtonWeb>
              <button>
                <svg aria-label="Options" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Options</title><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
              </button>
            </div>

            <div className='d-flex flex-row col-md-9' style={{ gap: 40 }}>
              <StatisticNumber number={FormatNumber(userData.posts)} text={"posts"}></StatisticNumber>
              <StatisticNumber number={FormatNumber(userData.followers)} text={"followers"}></StatisticNumber>
              <StatisticNumber number={FormatNumber(userData.following)} text={"following"}></StatisticNumber>
            </div>

            <NameTag nameTag={userData.fullname}></NameTag>

            <div className='row d-flex col-md-10'>
              <TextWeb text={userData.bio}></TextWeb>
              <div className='d-flex align-items-center'>
                <svg aria-label="Link icon" class="x1lliihq x1n2onr6 x7l2uk3" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title>Link icon</title><path d="m9.726 5.123 1.228-1.228a6.47 6.47 0 0 1 9.15 9.152l-1.227 1.227m-4.603 4.603-1.228 1.228a6.47 6.47 0 0 1-9.15-9.152l1.227-1.227" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="8.471" x2="15.529" y1="15.529" y2="8.471"></line></svg>
                <LinkWeb url={userData.links[0]} />
              </div>
            </div>

          </div>
        </div>

        <div className='row d-flex justify-content-center pt-5'>

          <div className='row d-flex col-md-10 nav-bound'>

            <div className='row justify-content-center navigate-part'>

              <NavButton isChosen={navOptionArr == contentType.post.code} onClick={() => {setNavOptionArr(contentType.post.code) ; LoadContent(contentType.post.code)}} text={contentType.post.name} svg={<svg aria-label="" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title></title><rect fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>} />

              <NavButton isChosen={navOptionArr == contentType.video.code} onClick={() => {setNavOptionArr(contentType.video.code) ; LoadContent(contentType.video.code)}} text={contentType.video.name} svg={<svg aria-label="" class="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title></title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fill-rule="evenodd"></path></svg>} />

            </div>
          </div>

        </div>


        <div className='row d-flex justify-content-center' style={{ padding: 0 }}>
          <div className='row d-flex col-md-10' style={{ padding: 0 }}>
            {
              userMediaDisplay.map(u => 
                <ImageItem 
                  onClick={()=>(setShowPostDetail(true), setChosenPostId(u.id))} 
                  type={navOptionArr} 
                  image={u.url} 
                  interaction={u.interaction} />
              )
            }            
          </div>
        </div>

      </div>
      </div>
  )
}

const ImageItem = ({ image, style, interaction, type, onClick }) => {
  return (
    <button onClick={() => onClick()} style={{padding: 0, ...style }} className={(type == contentType.post.code ? 'col-md-4 square-box' : 'col-md-3 regtangle-box')} >
      <div className='square-content'>
        <div style={{ width: "100%", height: "100%" }}>
          <img src={image} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Avatar" />
          <div className='info-effect align-items-center justify-content-center' style={{gap: 20}}>
            
            <InteractNumber
              number={FormatNumber(interaction.likes)}
              icon={<svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="#FFFFFF"/>
              </svg>}
            />

            <InteractNumber
              number={FormatNumber(interaction.comments)}
              icon={<svg fill="#FFFFFF" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
              width="25px" height="25px" viewBox="796 796 200 200" enable-background="new 796 796 200 200">
              <path d="M896.001,812.517c-55.23,0-100.001,31.369-100.001,70.071c0,18.018,9.72,34.439,25.67,46.851
                c3.721,2.895,5.446,7.685,4.424,12.286l-6.872,30.926c-0.498,2.242,0.419,4.561,2.316,5.855c1.896,1.295,4.391,1.304,6.297,0.022
                l36.909-24.804c3.238-2.176,7.17-3.074,11.032-2.516c6.532,0.945,13.294,1.448,20.226,1.448c55.227,0,99.999-31.37,99.999-70.069
                C996,843.886,951.229,812.517,896.001,812.517z"/>
              </svg>}
            />
          </div>

          {
            type == contentType.post.code ? "" : (
              <div className='views-layout' style={{gap: 20}}>
            
                <ViewsNumber
                  number={FormatNumber(interaction.views)}
                  icon={<svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z" fill="#FFFFFF"/>
                  </svg>}
                />
    
              </div>
            )
          }

        </div>
      </div>
    </button>
  )
}

const NameTag = ({ nameTag }) => {
  return (
    <div className='row d-flex col-md-10'>
      <h6 style={{ margin: 0 }}>{nameTag}</h6>
    </div>
  )
}

const InteractNumber = ({number, icon}) => {
  return(
    <div style={{gap:"3px"}} className='d-flex flex-row align-items-center'>
      {icon}
      <b>{number}</b>
    </div>
  )
}

const ViewsNumber = ({number, icon}) => {
  return(
    <div style={{gap:"3px", marginLeft: "20px", marginBottom: "20px"}} className='d-flex flex-row align-items-end'>
      {icon}
      <b>{number}</b>
    </div>
  )
}

const NavButton = ({ text, svg, isChosen, onClick }) => {
  return (
    <button onClick={() => onClick()} className='col-md-2 d-flex flex-row align-items-center justify-content-center bg-white'>
      <div className={(isChosen ? 'chosenNav' : 'unChosenNav') + ' d-flex flex-row align-items-center pt-2 pb-2 image-item'}>
        {svg}
        <TextWeb style={{ marginLeft: 5 }} text={text} />
      </div>
    </button>
  )
}

const StatisticNumber = ({ number, text }) => {
  return (
    <div className='d-flex flex-row' style={{ gap: 5 }}>
      <b style={{ margin: 0 }}>{number}</b><TextWeb text={text} />
    </div>
  )
}

// Custom component for displaying an avatar
const AvatarDiv = ({ image }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 200,
        width: 200,
        borderRadius: "100%",
        overflow: "hidden",
      }}
    >
      <img src={image} style={{ width: "100%" }} alt="Avatar" />
    </div>
  );
};

const LinkWeb = ({ url }) => {
  return (
    <a style={{ textDecoration: 'none' }} href='www.ozgame.com.vn'><p style={{ margin: 0, marginLeft: "5px" }}>{url}</p></a>
  )
}

const ButtonWeb = ({ title, onClick }) => {
  return (
    <button onClick={onClick} className='btn btn-secondary'>{title}</button>
  )
}

const TextWeb = ({ text, style }) => {
  return (
    <p style={{ margin: 0, ...style }}>{text}</p>
  )
}

// A function to format the number based on its magnitude
const FormatNumber = (num) => {
  // If the number is less than 1000, return it as it is
  if (num < 1000) return num;

  // If the number is between 1000 and 999999, divide it by 1000, round it to the nearest integer, and divide it by 10 to get the decimal point, then add a K suffix
  if (num >= 1000 && num <= 999999) {
    return Math.round(num / 100) / 10 + "K";
  }

  // If the number is between 1000000 and 999999999, divide it by 1000000, round it to the nearest integer, and divide it by 10 to get the decimal point, then add a M suffix
  if (num >= 1000000 && num <= 999999999) {
    return Math.round(num / 100000) / 10 + "M";
  }

  // If the number is greater than 999999999, divide it by 1000000000, round it to the nearest integer, and divide it by 10 to get the decimal point, then add a B suffix
  if (num > 999999999) {
    return Math.round(num / 100000000) / 10 + "B";
  }
}

export default ProfileScreen