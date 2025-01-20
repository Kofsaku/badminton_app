// This is draft design for teams league

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import AdminHeader from "../../components/Shared/AdminHeader";
// import AdminSidebar from "../../components/Shared/AdminSidebar";

// const TeamMatchDetails = () => {
//   const [matches, setMatches] = useState([]);
//   const [match, setMatch] = useState({})
//   // const [matchRound, setMatchRound] = /
//   const [page, setPage] = useState(0)

//   useEffect(() => {
//     axios.get("/matches/display_all_team_matches").then((response) => {
//       console.log(response.data)
//       setMatches(response.data);
//       setMatch(response.data[page])
//     });
//   }, []);

//   const alphabet = new Array( 26 ).fill( 1 ).map( ( _, i ) => String.fromCharCode( 65 + i ) );

//   return (
//     <main className="admin-wrapper d-flex w-100 flex-wrap bg-EEEEEE">
//       <AdminSidebar />
//       <section className="right-content-wrapper overflow-auto custom-scroll1">
//         <AdminHeader />
//         <div>
//           <div className="header-wrapper px-3 pt-3">
//             <h3 className="">マッチ作成</h3>
//             <p className="text-secondary">{match.tournament?.name  + match.tournament_venue?.venue_name}</p>
//           </div>
//           <div className="content-wrapper m-auto px-5 pt-5">
//             <div className="info">
//               <div>試合形式</div>
//               <ul className="nav nav-pills mt-3">
//                 <li className="nav-item">
//                   <button
//                     type="button"
//                     disabled
//                     className={`nav-link border-color-green border px-5 ${
//                        "bg-green1 text-light"
//                     }`}
//                   >
//                     リーグ戦
//                   </button>
//                 </li>
//                 <li className="nav-item">
//                   <button
//                     type="button"
//                     disabled
//                     className={`nav-link border-color-green border ${
//                       "text-dark"
//                     }`}
//                   >
//                     トーナメント戦
//                   </button>
//                 </li>
//               </ul>
//               <div className="mt-5">リーグ表数</div>
//               <div className="mt-3">{match.tournament?.number_of_tables}</div>
//               <div className="mt-3">勝ち抜け数</div>
//               <div className="mt-3">{match.match_round?.number_of_winners}</div>
//             </div>
//             <div className="matches pt-5 mt-2">
//               {!!match.match_round?.details && match.match_round.details.map((round, index) => (
//                 <div key={index} className="rounds d-flex justify-content-between">
//                   <div className="round-name pr-5 mr-5 bold">{alphabet[index]}</div>
//                   <table>
//                     <thead>
//                       {!!round.first_team_members && round.first_team_members.map((memmber, i) => (
//                         <>
//                           <th></th>
//                           <th key={i}>{round.first_team_name + memmber.full_name}</th>
//                         </>
//                       ))}
//                     </thead>
//                     <tbody>
//                       {!!round.second_team_members && round.second_team_members.map((memmber,i) => (
//                         <tr>
//                           <td key={i}>{round.first_team_name + memmber.full_name}</td>
//                           {round.first_team_members && round.first_team_members.map(() => (<td></td>))}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               ))}
              
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default TeamMatchDetails;
