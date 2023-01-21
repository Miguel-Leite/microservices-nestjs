import { gql, useQuery } from "@apollo/client";
import { getAccessToken, useUser, withPageAuthRequired } from "@auth0/nextjs-auth0"
import { useGetProductsQuery, useMeQuery } from "../../graphql/generated/graphql";
import { getServerPageGetProducts, ssrGetProducts } from "../../graphql/generated/page";
import { withApollo } from "../../lib/withApollo";


function Home(data) {
  const { user } = useUser();
  const { data: me } = useMeQuery();

  return (
    <div className="text-violet-500">
      <h1>Hello World</h1>
      <pre>
        Ok: {JSON.stringify(me, null, 2)} 
      </pre>
      
      <pre>
        {JSON.stringify(user, null, 2)} 
      </pre>

      <a href="/api/auth/logout">Logout</a>
    </div>
  )
}


export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    // return await getServerPageGetProducts({},ctx);
    return {
      props:{}
    } 
  }
});

export default withApollo(
  ssrGetProducts.withPage()(Home)
);