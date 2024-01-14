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
  {
    id : 1,
    url :"https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh.jpg",
    interaction: {
      likes : 573,
      comments: 125
    }
  },
  {
    id : 2,
    url :  "https://1.bp.blogspot.com/-EjM3TU6SttA/YTDxfrqOS8I/AAAAAAAAPD4/jRoRIhbfTGA3AGIZkiN1OCvEN8A46XQ7wCLcBGAsYHQ/s1351/9.jpg",
    interaction: {
      likes : 22332,
      comments: 1274
    }
  },
  {
    id : 3,
    url :"https://pbs.twimg.com/media/E-LRsAXVgAAuIOY?format=jpg&name=large",
    interaction: {
      likes : 6865453,
      comments: 3354
    }
  },
  {
    id : 4,
    url :"https://www.offdek.co/wp-content/uploads/2021/11/37D916F4-6CC0-4A60-A5D0-A48285D4F44D-515x650.jpeg",
    interaction: {
      likes : 193,
      comments: 277
    }
  },
  {
    id : 5,
    url :"https://cdn.theasianbeauty.com/media/medium_bxy59_96c696154eb4b20b15cf3253598c3e79_df0d4513f8.jpg",
    interaction: {
      likes : 89424,
      comments: 2134
    }
  },
  {
    id : 6,
    url :"https://img.bingfeng.tw/bingfeng/forum/202208/02/000212d4tcztmm0ric0ykx.jpg",
    interaction: {
      likes : 32109875,
      comments: 12532
    }
  },
  {
    id : 7,
    url :"https://kenh14cdn.com/2019/2/24/3561716420480213454575853861059020806684672n-15510057259571546306615.jpg",
    interaction: {
      likes : 78654,
      comments: 1255
    }
  },
  {
    id : 8,
    url :"https://i.pinimg.com/736x/1c/47/b8/1c47b8bbd9c2fcf93808bf1fdec80c0c.jpg",
    interaction: {
      likes : 342,
      comments: 73
    }
  },
  {
    id : 9,
    url :"https://i.pinimg.com/originals/8b/a0/20/8ba02036ae1020447ab7b714a1cea757.jpg",
    interaction: {
      likes : 687,
      comments: 32
    }
  },

]

const UserVideos = [
  {
    id : 1,
    url :"https://i.pinimg.com/originals/8b/a0/20/8ba02036ae1020447ab7b714a1cea757.jpg",
    interaction: {
      likes : 687,
      comments: 32,
      views: 5234
    }
  },
  {
    id : 10,
    url : "https://i.pinimg.com/originals/c9/fc/fb/c9fcfb9d5976d73345e599bc1e7b2468.jpg",
    interaction: {
      likes : 3473,
      comments: 154,
      views: 10043
    }
  },
  {
    id : 11,
    url : "https://i.pinimg.com/736x/3b/2f/86/3b2f868f57478ee4964260af6098337e.jpg",
    interaction: {
      likes : 9876,
      comments: 433,
      views: 18327
    }
  },
  {
    id : 12,
    url : "https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh.jpg",
    interaction: {
      likes : 34432,
      comments: 655,
      views: 321543
    }
  },
  {
    id : 2,
    url :  "https://1.bp.blogspot.com/-EjM3TU6SttA/YTDxfrqOS8I/AAAAAAAAPD4/jRoRIhbfTGA3AGIZkiN1OCvEN8A46XQ7wCLcBGAsYHQ/s1351/9.jpg",
    interaction: {
      likes : 22332,
      comments: 1274,
      views: 654765
    }
  },
  {
    id : 3,
    url :"https://pbs.twimg.com/media/E-LRsAXVgAAuIOY?format=jpg&name=large",
    interaction: {
      likes : 6865453,
      comments: 3354,
      views: 342809754
    }
  },
  {
    id : 4,
    url :"https://www.offdek.co/wp-content/uploads/2021/11/37D916F4-6CC0-4A60-A5D0-A48285D4F44D-515x650.jpeg",
    interaction: {
      likes : 193,
      comments: 277,
      views: 4325
    }
  },
  {
    id : 5,
    url :"https://cdn.theasianbeauty.com/media/medium_bxy59_96c696154eb4b20b15cf3253598c3e79_df0d4513f8.jpg",
    interaction: {
      likes : 89424,
      comments: 2134,
      views: 432987
    }
  },
  {
    id : 6,
    url :"https://img.bingfeng.tw/bingfeng/forum/202208/02/000212d4tcztmm0ric0ykx.jpg",
    interaction: {
      likes : 32109875,
      comments: 12532,
      views: 430278430
    }
  },
  {
    id : 7,
    url :"https://kenh14cdn.com/2019/2/24/3561716420480213454575853861059020806684672n-15510057259571546306615.jpg",
    interaction: {
      likes : 78654,
      comments: 1255,
      views: 324798
    }
  },
  {
    id : 8,
    url :"https://i.pinimg.com/736x/1c/47/b8/1c47b8bbd9c2fcf93808bf1fdec80c0c.jpg",
    interaction: {
      likes : 3424,
      comments: 173,
      views: 43984
    }
  },
  {
    id : 9,
    url :"https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh.jpg",
    interaction: {
      likes : 573,
      comments: 125,
      views : 3287
    }
  }
]

/* ====== coding start here =======*/

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
  const [userData, setUserData] = useState(UserProfileData);
  const [userMediaDisplay, setUserMediaDisplay] = useState(UserPosts);
  const [navOptionArr, setNavOptionArr] = useState(contentType.post.code);

  const LoadContent = (type) => {
    switch(type){
      case contentType.post.code : setUserMediaDisplay(UserPosts) ; break
      case contentType.video.code : setUserMediaDisplay(UserVideos) ; break
      default : setUserMediaDisplay(UserPosts) ; break
    }
  }

  return (
    <div
      className="container"
    >

      <div className='row d-flex justify-content-center pt-5'>

        <div className='col-md-3'>
          <div className="App">
            <AvatarDiv image="https://yt3.googleusercontent.com/ytc/AGIKgqOEhDpaYA9vBKDtGNDV8d1KFa2GklN592uvVYNw=s900-c-k-c0x00ffffff-no-rj" />
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
          <ImageItem type={navOptionArr} image={userMediaDisplay[0].url} interaction={userMediaDisplay[0].interaction} />
          <ImageItem type={navOptionArr} image={userMediaDisplay[1].url} interaction={userMediaDisplay[1].interaction}/>
          <ImageItem type={navOptionArr} image={userMediaDisplay[2].url} interaction={userMediaDisplay[2].interaction}/>
          <ImageItem type={navOptionArr} image={userMediaDisplay[3].url} interaction={userMediaDisplay[3].interaction}/>
          <ImageItem type={navOptionArr} image={userMediaDisplay[4].url} interaction={userMediaDisplay[4].interaction}/>
          <ImageItem type={navOptionArr} image={userMediaDisplay[5].url} interaction={userMediaDisplay[5].interaction}/>
          <ImageItem type={navOptionArr} image={userMediaDisplay[6].url} interaction={userMediaDisplay[6].interaction}/>
          <ImageItem type={navOptionArr} image={userMediaDisplay[7].url} interaction={userMediaDisplay[7].interaction}/>
          <ImageItem type={navOptionArr} image={userMediaDisplay[8].url} interaction={userMediaDisplay[8].interaction}/>
        </div>
      </div>

    </div>

  )
}

const ImageItem = ({ image, style, interaction, type }) => {
  return (
    <div style={{padding: 0, ...style }} className={(type == contentType.post.code ? 'col-md-4 square-box' : 'col-md-3 regtangle-box')} >
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
    </div>
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