import Post from "../components/post"

const AllPosts = (props) => {

    return props.posts.map((x)=>{
        return <Post key={x.id} post={x}/>
    })
}

export default AllPosts