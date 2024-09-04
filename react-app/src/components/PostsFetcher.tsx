import { useEffect, useState } from 'react';
import axios from 'axios';

type User = {
  id: number;
  name: string;
};

type Post = {
  userId: number;
};

const PostsFetcher = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [postsCount, setPostsCount] = useState<Map<number, number>>(new Map());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
        setUsers(usersResponse.data);

        const postsResponse = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
        const countMap = new Map<number, number>();

        postsResponse.data.forEach(post => {
          countMap.set(post.userId, (countMap.get(post.userId) || 0) + 1);
        });

        setPostsCount(countMap);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="posts-container">
      <h1>Users and Post Counts</h1>
      <ul>
        {users.map(user => (
          <li key={user.id} className="post-item">
            <span className="user-name">{user.name}</span>
            <span className="post-count">{postsCount.get(user.id) || 0} posts</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsFetcher;
