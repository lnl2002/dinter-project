/* ====== mock data for user =======*/
export const UserData = {
  username: "phuong.than.quang",
  posts: 102,
  followers: 371321,
  following: 44,
  fullname: "Thân Quang Phương",
  avatar: "https://yt3.googleusercontent.com/ytc/AGIKgqOEhDpaYA9vBKDtGNDV8d1KFa2GklN592uvVYNw=s900-c-k-c0x00ffffff-no-rj",
  bio: "This is bio, you can know about me by reading this",
  links: [
    "www.ozgame.com.vn",
    "https://www.facebook.com/phuongtqhe176459.ctvo/"
  ]
}

export const UserPosts = [
  {
    id : 0,
    // url :"https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh.jpg",
    url: "https://gulfbusiness.com/wp-content/uploads/2021/08/GettyImages-1069786222.jpg",
    interaction: {
      likes : 573,
      comments: 125
    },
    user_data :{
      username: "phuong.than.quang",
      avatar: "https://yt3.googleusercontent.com/ytc/AGIKgqOEhDpaYA9vBKDtGNDV8d1KFa2GklN592uvVYNw=s900-c-k-c0x00ffffff-no-rj",
    },
    comment_data:
    [
      {
        id:1,
        user:{
          user_name: "fukan.zo",
          avatar: "https://www.offdek.co/wp-content/uploads/2021/11/37D916F4-6CC0-4A60-A5D0-A48285D4F44D-515x650.jpeg"
        },
        content: "that's good",
        time: "12:23:09 11/03/2023",
        likes: "1562"
      },
      {
        id:2,
        user:{
          user_name: "ghuhan_08",
          avatar: "https://img.bingfeng.tw/bingfeng/forum/202208/02/000212d4tcztmm0ric0ykx.jpg"
        },
        content: "can't be more pretty",
        time: "01:23:09 11/01/2024",
        likes: "432"
      },
      {
        id:3,
        user:{
          user_name: "lamena.zy",
          avatar: "https://kenh14cdn.com/2019/2/24/3561716420480213454575853861059020806684672n-15510057259571546306615.jpg"
        },
        content: "so can we be friends",
        time: "07:14:09 27/09/2023",
        likes: "1562"
      }
    ]
  },
  {
    id :1,
    url :  "https://1.bp.blogspot.com/-EjM3TU6SttA/YTDxfrqOS8I/AAAAAAAAPD4/jRoRIhbfTGA3AGIZkiN1OCvEN8A46XQ7wCLcBGAsYHQ/s1351/9.jpg",
    interaction: {
      likes : 22332,
      comments: 1274
    }
  },
  {
    id : 2,
    url :"https://pbs.twimg.com/media/E-LRsAXVgAAuIOY?format=jpg&name=large",
    interaction: {
      likes : 6865453,
      comments: 3354
    }
  },
  {
    id : 3,
    url :"https://www.offdek.co/wp-content/uploads/2021/11/37D916F4-6CC0-4A60-A5D0-A48285D4F44D-515x650.jpeg",
    interaction: {
      likes : 193,
      comments: 277
    }
  },
  {
    id : 4,
    url :"https://cdn.theasianbeauty.com/media/medium_bxy59_96c696154eb4b20b15cf3253598c3e79_df0d4513f8.jpg",
    interaction: {
      likes : 89424,
      comments: 2134
    }
  },
  {
    id : 5,
    url :"https://img.bingfeng.tw/bingfeng/forum/202208/02/000212d4tcztmm0ric0ykx.jpg",
    interaction: {
      likes : 32109875,
      comments: 12532
    }
  },
  {
    id : 6,
    url :"https://kenh14cdn.com/2019/2/24/3561716420480213454575853861059020806684672n-15510057259571546306615.jpg",
    interaction: {
      likes : 78654,
      comments: 1255
    }
  },
  {
    id :7,
    url :"https://i.pinimg.com/736x/1c/47/b8/1c47b8bbd9c2fcf93808bf1fdec80c0c.jpg",
    interaction: {
      likes : 342,
      comments: 73
    }
  },
  {
    id : 8,
    url :"https://i.pinimg.com/originals/8b/a0/20/8ba02036ae1020447ab7b714a1cea757.jpg",
    interaction: {
      likes : 687,
      comments: 32
    }
  },

]

export const UserVideos = [
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
