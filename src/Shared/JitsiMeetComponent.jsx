import React,{useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import { JitsiMeeting } from '@jitsi/react-sdk';
import {jwtDecode} from 'jwt-decode';
const JitsiMeetingPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const roomName = searchParams.get('roomName');

  // Decode JWT and check expiration
  const decodedToken = jwtDecode(token);
  const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
  if (decodedToken.exp < currentTime) {
    console.log('Token has expired', token);
  } else {
    console.log('Token is valid');
  }

  // Check and request media permissions
  const checkAndRequestPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      console.log('Permissions granted');
    } catch (error) {
      console.log('Permissions not granted, requesting again', error);
    }
  };

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
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <JitsiMeeting
        domain="8x8.vc" // Or your domain (e.g., 'meet.jit.si')
        roomName={`vpaas-magic-cookie-d094018c492942dc88491e1fc6e5e0e6/${roomName}`} // Room name
        jwt={token} // Pass the JWT token
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
        userInfo={{
          displayName:"JohnDoe",
        }}
        getIFrameRef={(iframe) => {
          iframe.style.height = '100vh';
          iframe.style.width = '100vw';
        }}
      />
    </div>
  );
};

export default JitsiMeetingPage;
