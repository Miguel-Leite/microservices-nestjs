import { getAccessToken, getSession, useUser } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";



export default function Home() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async({req, res}) => {
  const sessions = getSession(req, res);

  if (!sessions) {
    return {
      redirect: {
        destination: '/api/auth/login',
        permanent: false
      }
    }
  } else {
    return {
      redirect: {
        destination: '/app',
        permanent: false
      }
    }
  }
}