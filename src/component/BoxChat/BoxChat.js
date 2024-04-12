import React, { useState, useEffect } from 'react';
import ListChat from './ListChat/ListChat';
import ItemChat from './ListChat/ItemChat';
import axios from 'axios'; // Import Axios để gọi API
import classNames from 'classnames/bind';
import styles from './BoxChat.module.scss';

const cx = classNames.bind(styles);
function BoxChat() {
    const [friendList, setFriendList] = useState([]);
    const [groupList, setGroupList] = useState([]);
    const storedData = localStorage.getItem('loginData');
    const userId = JSON.parse(storedData).foundUser._id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/group/getGroupList/${userId}`);
                setFriendList(response.data.userData.friendList);
                setGroupList(response.data.userData.groupList);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, [userId]);

    const onItemClick = (item) => {
        // Xử lý khi một item được chọn
    };

    const getAvatarUrl = (friend) => {
        // Kiểm tra xem avatar có hợp lệ không
        return friend.avatar
            ? friend.avatar
            : 'https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg';
    };

    return (
        <div className={cx('boxChat')}>
            <ListChat>
                {friendList.map((friend) => (
                    <ItemChat
                        key={friend._id}
                        id={friend._id}
                        avatar={<img className={cx('avatarImg')} src={getAvatarUrl(friend)} alt="avatar" />}
                        title={friend.name}
                        onItemClick={onItemClick}
                    />
                ))}
            </ListChat>
            <ListChat>
                {groupList.map((group) => (
                    <ItemChat
                        key={group._id}
                        id={group._id}
                        avatar={<img className={cx('avatarImg')} src={group.avatar} alt="avatar" />}
                        title={group.name}
                        onItemClick={onItemClick}
                    />
                ))}
            </ListChat>
        </div>
    );
}

export default BoxChat;
