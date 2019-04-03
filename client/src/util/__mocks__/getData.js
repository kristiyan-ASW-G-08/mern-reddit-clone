const getData = () => {
    return Promise.resolve(
      {
       userData:{},
       posts:[{
        title:'post',
        author:'NewUser',
        comments:0,
        communityName:'react',
        comments:0,
        _id:0
    },{
        title:'post',
        author:'NewUser',
        comments:0,
        communityName:'react',
        comments:0,
        _id:1
    }]
       }
    );
  };
  export default getData;