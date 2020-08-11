import React, { useState, FormEvent } from "react";
import PageHeader from "../../components/PageHeader";
import { useHistory } from "react-router-dom";

import "./styles.css";
import Input from "../../components/Input";

import warningIcon from "../../assets/images/icons/warning.svg";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import api from "../../services/api";

const TeacherForm = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");

  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: "", to: "" },
  ]);

  const addNewScheduleItem = () => {
    setScheduleItems([
      ...scheduleItems,
      {
        week_day: 0,
        from: "",
        to: "",
      },
    ]);
  };

  const setScheduleItemValue = (
    position: number,
    field: string,
    value: string
  ) => {
    const newArray = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }
      return scheduleItem;
    });

    setScheduleItems(newArray);
  };

  const handleCreateClass = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/classes", {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      });
      alert("Realizado!!");
      history.push("/");
    } catch (err) {
      alert("Erro!");
    }
  };

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrivel que voce quer dar aulas"
        description="O primeiro passo eh preencher esse formulario"
      />

      <main>
        <form onSubmit={(e) => handleCreateClass(e)}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e) => {
                setAvatar(e.target.value);
              }}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={(e) => {
                setWhatsapp(e.target.value);
              }}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Materia"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              options={[
                { value: "Artes", label: "Artes" },
                { value: "Biologia", label: "Biologia" },
                { value: "Ciencias", label: "Ciencias" },
                { value: "Educacao fisica", label: "Educacao fisica" },
                { value: "Fisica", label: "Fisica" },
                { value: "Geografia", label: "Geografia" },
                { value: "Historia", label: "Historia" },
                { value: "Quimica", label: "Quimica" },
                { value: "Portugues", label: "Portugues" },
                { value: "Matematica", label: "Quimica" },
              ]}
            />
            <Input
              value={cost}
              onChange={(e) => {
                setCost(e.target.value);
              }}
              name="cost"
              label="Custo da sua hora por aula"
            />
          </fieldset>

          <fieldset>
            <legend>
              Horarios disponiveis
              <button onClick={() => addNewScheduleItem()} type="button">
                + Novo horario
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select
                    value={scheduleItem.week_day}
                    name="week_day"
                    label="Dia da semana"
                    onChange={(e) =>
                      setScheduleItemValue(index, "week_day", e.target.value)
                    }
                    options={[
                      { value: "0", label: "Domingo" },
                      { value: "1", label: "Segunda" },
                      { value: "2", label: "Terca" },
                      { value: "3 ", label: "Quarta" },
                      { value: "4", label: "Quinta" },
                      { value: "5", label: "Sexta" },
                      { value: "6", label: "Sabado" },
                    ]}
                  />
                  <Input
                    onChange={(e) =>
                      setScheduleItemValue(index, "from", e.target.value)
                    }
                    value={scheduleItem.from}
                    name="from"
                    label="Das"
                    type="time"
                  />
                  <Input
                    onChange={(e) =>
                      setScheduleItemValue(index, "to", e.target.value)
                    }
                    value={scheduleItem.to}
                    name="from"
                    label="Ate"
                    type="time"
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default TeacherForm;
