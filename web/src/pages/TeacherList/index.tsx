import React, { useState, FormEvent } from "react";

import "./styles.css";
import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";
import api from "../../services/api";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  const searchTeachers = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.get("classes", {
        params: {
          subject,
          week_day,
          time,
        },
      });
      setTeachers(res.data);
    } catch (err) {
      alert("Error");
    }
  };

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes sao os proffys disponiveis">
        <form onSubmit={(e) => searchTeachers(e)} id="search-teachers">
          <Select
            name="subject"
            label="Materia"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
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
          <Select
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={(e) => setWeekDay(e.target.value)}
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
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
            type="time"
            name="time"
            label="Hora"
          />
          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </main>
    </div>
  );
};

export default TeacherList;
