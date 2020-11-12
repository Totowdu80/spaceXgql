import { useQuery, gql } from '@apollo/client';

const lastLaunches = gql`
  query GetLastLaunches {
    launches(limit: 5) {
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
      id
    }
  }
`;

function LaunchesList() {
  const { loading, error, data } = useQuery(lastLaunches);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return data.launches.map(({ id, launch_date_utc, launch_success, rocket, links, details }) => (
    <div key={id} className="RocketContainer">
      <p>Date de lancement: {launch_date_utc}</p>
      <p>Réussite du lancement: { launch_success ? "Success" : "Failed" }</p>
      <p>Nom de la fusée: {rocket.rocket_name}</p>
      <p>Video du lancement: {links.video_link}</p>
      <p>Autres détails : {details}</p>
    </div>
  ))
}

export default LaunchesList;