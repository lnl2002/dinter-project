import { useState } from 'react'
import './style/ProfileScreen.css'

/* ====== mock data for user =======*/
const UserProfileData = {
  username: "phuong.than.quang",
  posts: 102,
  followers: 371321,
  following: 44,
  fullname: "Thân Quang Phương",
  bio: "This is bio, you can know about me by reading this",
  links: [
    "www.ozgame.com.vn",
    "https://www.facebook.com/phuongtqhe176459.ctvo/"
  ]
}
const UserPosts = [
  "https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh.jpg",
  "https://th.bing.com/th/id/OIP.VG4fIudDVtQTCYmNtfAhTwHaHa?rs=1&pid=ImgDetMain",
  "https://1.bp.blogspot.com/-EjM3TU6SttA/YTDxfrqOS8I/AAAAAAAAPD4/jRoRIhbfTGA3AGIZkiN1OCvEN8A46XQ7wCLcBGAsYHQ/s1351/9.jpg",
  "https://pbs.twimg.com/media/E-LRsAXVgAAuIOY?format=jpg&name=large",
  "https://www.offdek.co/wp-content/uploads/2021/11/37D916F4-6CC0-4A60-A5D0-A48285D4F44D-515x650.jpeg",
  "https://cdn.theasianbeauty.com/media/medium_bxy59_96c696154eb4b20b15cf3253598c3e79_df0d4513f8.jpg",
  "https://img.bingfeng.tw/bingfeng/forum/202208/02/000212d4tcztmm0ric0ykx.jpg",
  "https://kenh14cdn.com/2019/2/24/3561716420480213454575853861059020806684672n-15510057259571546306615.jpg",
  "https://i.pinimg.com/736x/1c/47/b8/1c47b8bbd9c2fcf93808bf1fdec80c0c.jpg"
]

const UserVideos = [
  "https://i.pinimg.com/originals/8b/a0/20/8ba02036ae1020447ab7b714a1cea757.jpg",
  "https://i.pinimg.com/originals/c9/fc/fb/c9fcfb9d5976d73345e599bc1e7b2468.jpg",
  "https://i.pinimg.com/736x/3b/2f/86/3b2f868f57478ee4964260af6098337e.jpg",
  "https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh.jpg",
  "https://th.bing.com/th/id/OIP.VG4fIudDVtQTCYmNtfAhTwHaHa?rs=1&pid=ImgDetMain",
  "https://1.bp.blogspot.com/-EjM3TU6SttA/YTDxfrqOS8I/AAAAAAAAPD4/jRoRIhbfTGA3AGIZkiN1OCvEN8A46XQ7wCLcBGAsYHQ/s1351/9.jpg",
  "https://pbs.twimg.com/media/E-LRsAXVgAAuIOY?format=jpg&name=large",
  "https://www.offdek.co/wp-content/uploads/2021/11/37D916F4-6CC0-4A60-A5D0-A48285D4F44D-515x650.jpeg",
  "https://cdn.theasianbeauty.com/media/medium_bxy59_96c696154eb4b20b15cf3253598c3e79_df0d4513f8.jpg",
  "https://img.bingfeng.tw/bingfeng/forum/202208/02/000212d4tcztmm0ric0ykx.jpg",
  "https://kenh14cdn.com/2019/2/24/3561716420480213454575853861059020806684672n-15510057259571546306615.jpg",
  "https://i.pinimg.com/736x/1c/47/b8/1c47b8bbd9c2fcf93808bf1fdec80c0c.jpg"
]

/* ====== coding start here =======*/

function ProfileScreen(props) {
  const[userData, setUserData] = useState(UserProfileData);
  const[navOptionArr, setNavOptionArr] = useState([true, false]); 

  return (
    <div
      className="container"
    >

      <div className='row d-flex justify-content-center pt-5'>

        <div className='col-md-3'>
          <div  className="App">
            <AvatarDiv image="https://yt3.googleusercontent.com/ytc/AGIKgqOEhDpaYA9vBKDtGNDV8d1KFa2GklN592uvVYNw=s900-c-k-c0x00ffffff-no-rj" />
          </div>
        </div>

        <div className="col-md-5 d-flex flex-column" style={{gap:20}}>

          <div className='name-field d-flex flex-row align-content-center' style={{gap:10}}>
            <h5>{userData.username}</h5>
            <ButtonWeb title={"Edit profile"}></ButtonWeb>
            <ButtonWeb title={"View archive"}></ButtonWeb>
            <button>
              <svg aria-label="Options" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Options</title><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
            </button>
          </div>

          <div className='row d-flex col-md-8'>
            <StatisticNumber number={FormatNumber(userData.posts)} text={"posts"}></StatisticNumber>
            <StatisticNumber number={FormatNumber(userData.followers)} text={"follower"}></StatisticNumber>
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
            
            <NavButton isChosen={navOptionArr[0]} onClick={()=> setNavOptionArr([true, false])} text={"POSTS"} svg={<svg aria-label="" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title></title><rect fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>}/>

            <NavButton isChosen={navOptionArr[1]} onClick={()=> setNavOptionArr([false, true])} text={"VIDEOS"} svg={<svg aria-label="" class="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title></title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fill-rule="evenodd"></path></svg>}/>            

          </div>
        </div>

      </div>
    </div>

  )
}



const NameTag = ({nameTag}) =>{
  return(
    <div className='row d-flex col-md-10'>
      <h6 style={{margin:0}}>{nameTag}</h6>
    </div>
  )
}

const NavButton = ({text, svg, isChosen, onClick}) => {
  return(
    <button onClick={() => onClick()} className='col-md-2 d-flex flex-row align-items-center justify-content-center'>
      <div className={ (isChosen ? 'chosenNav' : 'unChosenNav') + ' d-flex flex-row align-items-center pt-2 pb-2'}>
        {svg}
        <TextWeb style={{marginLeft: 5}} text={text}/>
        </div>
    </button>
  )
}

const StatisticNumber = ({number, text}) => {
  return(
    <div className='col-md-4 d-flex flex-row' style={{gap:5}}>
      <b style={{margin:0}}>{number}</b><TextWeb text={text}/>
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
      <img src={image} style={{width:"100%"}} alt="Avatar" />
    </div>
  );
};

const LinkWeb = ({url}) => {
  return(
    <a style={{textDecoration: 'none'}} href='www.ozgame.com.vn'><p style={{margin:0, marginLeft:"5px"}}>{url}</p></a>
  )
}

const ButtonWeb = ({title, onClick}) => {
  return(
    <button onClick={onClick} className='btn btn-secondary'>{title}</button>
  )
}

const TextWeb = ({text, style}) => {
  return(
    <p style={{margin:0, ...style}}>{text}</p>
  )
}

// A function to format the number based on its magnitude
const FormatNumber = (num) => {
  // If the number is less than 1000, return it as it is
  if (num < 1000) return num;

  // If the number is between 1000 and 999999, divide it by 1000, round it to the nearest integer, and divide it by 10 to get the decimal point, then add a K suffix
  if (num >= 1000 && num <= 999999) {
    return Math.round(num / 1000) / 10 + "K";
  }

  // If the number is between 1000000 and 999999999, divide it by 1000000, round it to the nearest integer, and divide it by 10 to get the decimal point, then add a M suffix
  if (num >= 1000000 && num <= 999999999) {
    return Math.round(num / 1000000) / 10 + "M";
  }

  // If the number is greater than 999999999, divide it by 1000000000, round it to the nearest integer, and divide it by 10 to get the decimal point, then add a B suffix
  if (num > 999999999) {
    return Math.round(num / 1000000000) / 10 + "B";
  }
}

export default ProfileScreen