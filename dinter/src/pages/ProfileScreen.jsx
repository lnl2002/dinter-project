import './style/ProfileScreen.css'

function ProfileScreen(props) {

  return (
    <div
      className="container"
    >

      <div className='row d-flex justify-content-center pt-5'>

        <div className='col-md-3'>
          <div  className="App">
            <AvatarDiv image="https://material-ui.com/static/images/avatar/1.jpg" />
          </div>
        </div>

        <div className="col-md-5 d-flex flex-column" style={{gap:20}}>

          <div className='name-field d-flex flex-row align-content-center' style={{gap:10}}>
            <h5>phuong.than.quang</h5>
            <ButtonWeb title={"Edit profile"}></ButtonWeb>
            <ButtonWeb title={"View archive"}></ButtonWeb>
            <button>
              <svg aria-label="Options" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Options</title><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
            </button>
          </div>

          <div className='row d-flex col-md-10'>
            <StatisticNumber number={12} text={"posts"}></StatisticNumber>
            <StatisticNumber number={22} text={"follower"}></StatisticNumber>
            <StatisticNumber number={432} text={"following"}></StatisticNumber>
          </div>

        </div>
      </div>

      <div className='row'>

      </div>
    </div>

  )
}

const StatisticNumber = ({number, text}) => {
  return(
    <div className='col-md-4 d-flex flex-row' style={{gap:5}}>
      <b>{number}</b><p>{text}</p>
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

const ButtonWeb = ({title, onClick}) => {
  return(
    <button onClick={onClick} className='btn btn-secondary'>{title}</button>
  )
}

export default ProfileScreen