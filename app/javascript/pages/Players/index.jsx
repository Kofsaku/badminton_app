import React from 'react';
import AdminHeader from '../../components/Shared/AdminHeader';
import AdminSidebar from '../../components/Shared/AdminSidebar';
import { Link } from 'react-router-dom';

const Players = () => {
  return (
    <main className="admin-wrapper d-flex w-100 flex-wrap bg-EEEEEE">
      <AdminSidebar />
      <section className="right-content-wrapper overflow-auto custom-scroll1">
        <AdminHeader />

        <div className="d-block w-100 px-lg-4 px-md-4 px-sm-4 px-2 py-4">
           <div className="d-block w-100 mb-3">
             <div className="d-flex flex-wrap w-100 align-items-center justify-content-between">
               <div className="d-inline-block min-width-clear mb-lg-0 mb-md-0 mb-sm-0 mb-3">
                 <h3 className="text-black text-20 mob-text-18 fw-bold merriweather-font mt-0 mb-2">Applicants</h3>
                 <p className="text-grey1 text-15 m-0">
                   Total Applicants
                   <span className="bg-green1 px-1 rounded-3 text-white d-inline-block ms-1">20</span>
                 </p>
               </div>
               <div className="d-inline-block">
                 <a className="custom-btn5 mb-2">Check Payment Status</a>
               </div>
             </div>
           </div>
           <div className="d-block w-100">
             <div className="d-block w-100 custom-scroll1 table-overflow">
               <div className="d-block w-100 rounded-3">
                 <table className="w-100">
                   <thead>
                     <tr>
                       <th className="bg-silver1 border border-color-silver2 text-14 px-3 py-2 merriweather-font">S.N</th>
                       <th className="bg-silver1 border border-color-silver2 text-14 px-3 py-2 merriweather-font">Name</th>
                       <th className="bg-silver1 border border-color-silver2 text-14 px-3 py-2 merriweather-font">Email</th>
                       <th className="bg-silver1 border border-color-silver2 text-14 px-3 py-2 merriweather-font">Position</th>
                       <th className="bg-silver1 border border-color-silver2 text-14 px-3 py-2 merriweather-font">Current Tournament</th>
                       <th className="bg-silver1 border border-color-silver2 text-14 px-3 py-2 merriweather-font">Previous Tournament</th>
                       <th className="bg-silver1 border border-color-silver2 text-14 px-3 py-2 merriweather-font text-center">Status</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr>
                       <td className="bg-silver4 px-3 py-2 merriweather-font fw-medium text-14 border border-color-silver2">01</td>
                       <td className="bg-silver4 px-3 py-2 merriweather-font fw-medium text-14 border border-color-silver2">John Doe</td>
                       <td className="bg-silver4 px-3 py-2 merriweather-font fw-medium text-14 border border-color-silver2">john.doe@gmail.com</td>
                       <td className="bg-silver4 px-3 py-2 merriweather-font fw-medium text-14 border border-color-silver2">Defense</td>
                       <td className="bg-silver4 px-3 py-2 merriweather-font fw-medium text-14 border border-color-silver2">Japan/Tokyo</td>
                       <td className="bg-silver4 px-3 py-2 merriweather-font fw-medium text-14 border border-color-silver2">Taiwan</td>
                       <td className="bg-silver4 px-3 py-2 merriweather-font fw-medium text-14 border border-color-silver2 text-center">
                         <span className="d-inline-block bg-success px-3 py-2 text-white rounded-pill">Confirmed</span>
                       </td>
                     </tr>
                     {/* Add more rows as needed */}
                   </tbody>
                   <tfoot>
                     <tr>
                       <td className="bg-silver4 px-3 py-3 merriweather-font fw-medium text-14 border border-color-silver2 text-end" colSpan="7">
                         <div className="d-flex justify-content-end">
                           <button className="bg-white border-0 mx-1 d-flex align-items-center justify-content-center shadow-sm rounded-3 px-2 py-1">
                             <i className="fa fa-angle-left text-14"></i>
                           </button>
                           <button className="border-0 dmsans-font bg-green1 text-white mx-1 d-flex align-items-center justify-content-center shadow-sm rounded-3 px-2 py-1">01</button>
                           <button className="border-0 dmsans-font bg-silver2 mx-1 d-flex align-items-center justify-content-center shadow-sm rounded-3 px-2 py-1">02</button>
                           <button className="border-0 dmsans-font bg-silver2 mx-1 d-flex align-items-center justify-content-center shadow-sm rounded-3 px-2 py-1">...</button>
                           <button className="border-0 dmsans-font bg-silver2 mx-1 d-flex align-items-center justify-content-center shadow-sm rounded-3 px-2 py-1">13</button>
                           <button className="border-0 dmsans-font bg-silver2 mx-1 d-flex align-items-center justify-content-center shadow-sm rounded-3 px-2 py-1">14</button>
                           <button className="bg-white border-0 mx-1 d-flex align-items-center justify-content-center shadow-sm rounded-3 px-2 py-1">
                             <i className="fa fa-angle-right text-14"></i>
                           </button>
                         </div>
                       </td>
                     </tr>
                   </tfoot>
                 </table>
               </div>
             </div>
           </div>
        </div>
      </section>
    </main>
  );
};

export default Players;
