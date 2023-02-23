import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import UserProfile from '../../molecules/profile/UserProfile';
import ArtistProfile from '../../molecules/profile/ArtistProfile';

export default function Profile() {
  const { userInfo } = useSelector((state) => state.auth);

  function stringToColor(name) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < name.length; i += 1) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Avatar
        sx={{
          backgroundColor: stringToColor(userInfo?.name),
          width: 100,
          height: 100,
          marginX: '5px',
        }}
        alt={userInfo?.name}
        src={`${process.env.REACT_APP_API_URL}/media?id=${userInfo?._id}`}
      ></Avatar>
      <Typography>{userInfo?.name}</Typography>
      {userInfo?.role === 'CONSUMER' ? (
        <UserProfile></UserProfile>
      ) : (
        <ArtistProfile></ArtistProfile>
      )}
    </Box>
  );
}
