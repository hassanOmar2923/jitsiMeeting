import React,{useEffect,useState} from 'react';
import { useSearchParams } from 'react-router-dom';
import { JitsiMeeting } from '@jitsi/react-sdk';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
const JitsiMeetingPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const serialNumber = searchParams.get('serialNumber');

  // Decode JWT and check expiration
  // const decodedToken = jwtDecode(token);
  // const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
  // if (decodedToken.exp < currentTime) {
  //   console.log('Token has expired', token);
  // } else {
  //   console.log('Token is valid');
  // }

  // Check and request media permissions
  const checkAndRequestPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      console.log('Permissions granted');
    } catch (error) {
      console.log('Permissions not granted, requesting again', error);
    }
  };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data,setData]=useState({})
  useEffect(() => {
    async function getTokens() {
      try {
        setLoading(true);
        setError(null);
//   # VITE_APP_API=https://enaya-app-api.vercel.app
// VITE_APP_API=http://localhost:3030
        // Make API request to get meeting data
        const { data } = await axios.get(`https://enaya-app-api.vercel.app/getMeeting/${serialNumber}`);
        setData(data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }

      getTokens();


    return () => {
      console.log('Cleanup if necessary');
    };
  }, []); // Adding serialNumber as a dependency if it can change

  // useEffect for requesting permissions
  useEffect(() => {
    const requestPermissions = async () => {
      await checkAndRequestPermissions();
    };
    
    requestPermissions();

    return () => {
      console.log('Cleaning up Jitsi resources');
    };
  }, []);

  if (loading) {
    return <img src="/cenaya.gif" alt="Loading..." />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <JitsiMeeting
        domain="8x8.vc" // Or your domain (e.g., 'meet.jit.si')
        roomName={`vpaas-magic-cookie-d094018c492942dc88491e1fc6e5e0e6/${id}`} // Room name
        jwt={data.token} // Pass the JWT token
        configOverwrite={{
          startWithAudioMuted: false, // Automatically enable audio
          startWithVideoMuted: false, // Automatically enable video
          debug: true, // Enable debugging
  logging: {
    defaultLogLevel: 'trace', // Add more verbosity for logs
    defaultLogHandler: true,
  },
        }}
        interfaceConfigOverwrite={{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        }}
        // userInfo={{
        //   displayName:"JohnDoe",
        // }}
        getIFrameRef={(iframe) => {
          iframe.style.height = '100vh';
          iframe.style.width = '100vw';
        }}
      />
    </div>
  );
};

export default JitsiMeetingPage;
