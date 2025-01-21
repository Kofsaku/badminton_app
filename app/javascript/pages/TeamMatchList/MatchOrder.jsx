import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import { reOrderTeamMatch } from "../../api/tournamentApi";

const MatchOrder = ({id, setViewDetail}) => {
  const [match, setMatch] = useState({})
  const [timetableCell, setTimetableCell] = useState({})
  const [opponent, setOpponent] = useState({})
  const [teamMembers, setTeamMembers] = useState([])
  const [teamId, setTeamId] = useState(0)
  const [teamLength, setTeamLength] = useState([])
  const [formData, setFormData] = useState(new FormData)
  const navigate = useNavigate()
  
  useEffect(() => {
    axios.get(`/matches/${id}/match_order`).then((res) => {
      setMatch(res.data.match)
      setTimetableCell(res.data.timetable_cell)
      setOpponent(res.data.opponent)
      setTeamMembers(res.data.team_members)
      setTeamLength(res.data.team_members?.length)
      setTeamId(res.data.team.id)
    })
  }, [id])

  const orderArray = Array.from({length: teamLength}, (_, i) => i + 1)

  const handleChange = (e, index) => {
    const newFormData = formData
    const { name, value, dataset } = e.target;
    newFormData.append(name, value)
    newFormData.append(`match[team_match_orders_attributes][${index}][user_id]`, dataset.userId)
    newFormData.append(`match[team_match_orders_attributes][${index}][team_id]`, dataset.teamId)
    if (!teamMembers[index].order.id) {
      newFormData.append(`match[team_match_orders_attributes][${index}][id]`, dataset.id)
    }
    
    setFormData(newFormData)
    const newTeamMembers = [...teamMembers]
    newTeamMembers[index].order.order = value
    setTeamMembers(newTeamMembers)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await reOrderTeamMatch(id, formData)
      navigate('/team-matches')
    } catch (e) {
      console.log(e)
    }
  }

  const previosStep = () => {
    setViewDetail(false)
  }

  return (
    <main className="admin-wrapper d-flex w-100 flex-wrap bg-EEEEEE">
      <section className="custom-scroll1 text-center">
        <div className="header-wrapper px-5 pt-5">
            <button onClick={previosStep} className="bg-green1 p-2 rounded-2 d-flex align-items-center justify-content-center">
              <i className="fa fa-arrow-left text-14 text-white"></i>
            </button>
          <h1 className="">オーダー登録</h1>
        </div>
        
        <div className="content-wrapper bg-white m-5 overflow-visible p-4">
          <div className="detail-section">
            <div className="d-flex justify-content-center align-item-center p-2">
              <div className="p-2">試合日程</div>
              <div className="border bg-light p-2 w-25 text-center">{match.name}</div>
            </div>
            <div className="d-flex justify-content-center align-item-center p-2">
              <div className="p-2">試合番号</div>
              <div className="border bg-light p-2 w-25 text-center">{timetableCell.number}</div>
            </div>
            <div className="d-flex justify-content-center align-item-center p-2">
              <div className="p-2">対戦相手</div>
              <div className="border bg-light p-2 w-25 text-center">{opponent.title}</div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="reorder text-center">
                <table className="m-auto mt-4">
                  <thead>
                    <tr>
                      <th className="border bg-light w-25">選手名</th>
                      <th className="border bg-light w-25">順番</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member, index) => (
                      <tr key={member.id}>
                        <td className="border">
                          {member.full_name}
                        </td>
                        <td className="border bg-light">
                          <select value={member.order.order || ''} className="w-25" name={`match[team_match_orders_attributes][${index}][order]`} data-user-id={member.id} data-team-id={teamId} data-id={member.order.id} id={"order-user-" + member.id} onChange={(e) => handleChange(e, index)}>
                            <option value=""></option>
                            {orderArray?.map((value) => (
                              <option key={value} value={value.toString()}>{value}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
            <button type="submit" className="mt-5 m-auto bg-success text-white border-0 rounded p-2">オーダー表登録</button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default MatchOrder;

