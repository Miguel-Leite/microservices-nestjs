import { getAccessToken, useUser, withPageAuthRequired } from "@auth0/nextjs-auth0"

export default function Home() {
  const { user } = useUser();

  return (
    <div>
      <h1>Hello World</h1>
      <pre>
        {JSON.stringify(user, null, 2)} 
      </pre>

      <a href="/api/auth/logout">Logout</a>
    </div>
  )
}


export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {
    console.log(getAccessToken(req, res));

    return {
      props: {}
    }
  }
});

/**
 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Iko2RnFlSjNWeGhFQ0pJWUZqazYyWiJ9.eyJpc3MiOiJodHRwczovL21pZ3VlbC1sZWl0ZS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDU2NjE4Nzg2MzYwNDYxMzEwODEiLCJhdWQiOlsiaWduaXRlLWxhYi0wMS1hdXRoIiwiaHR0cHM6Ly9taWd1ZWwtbGVpdGUudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY3NDE0MDI5NSwiZXhwIjoxNjc0MjI2Njk1LCJhenAiOiJmNmxTMUFXRTJBdTVGS29tRmwzdkg1bktvRERiZHp0OSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.Buq9mMp4_N_kst8DzwKODGJBVaxWpkTQ2mE_qlpBe1fzg32SIx1CSw-Mrliqjhl5MV2pklgEw9XTzn_zRBQjUrZMShOX39mx384zzhTUU_KKokEmwjtfPVBwvG8HvspXUjl5_giblF-D6E6Dfl_k4JXQaGcCiizs_be7TVmLMaSTCsJAnnnJ-RAOmKsq0snD2pQmlwKT5TfXpqoUfMjIJ_1Pqn-fPTqIU1krwxUWGuf402zAA_uxxpi5oiFYKPJOArN_YT5OEWVdvCnOLESSeradPhLeEzTgGajmhc8MwJ_TXRyZ-Ft0WOm8EyXZP1uYz4SH6QXgpUrL-ToxgyzdSA'
 */