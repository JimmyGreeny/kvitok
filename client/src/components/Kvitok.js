import React, { useState, useEffect } from "react";
import "./kvitok/style.css";
import helpers from "./kvitok/helpers.js";
import axios from "axios";
//import InputSpinner from "react-bootstrap-input-spinner";
import ServicesData from "./kvitok/services.json";
import MaterialsData from "./kvitok/materials.json";

function Kvitok() {
  const [serv_rows, setServices] = useState([]);
  const handleCreateFormSubmit = () => {
    const empty_s_row = helpers.newServRow();
    setServices([...serv_rows, empty_s_row]);
    console.log(empty_s_row);
  };

  const [material_rows, setMaterials] = useState([]);
  const handleAddMaterial = () => {
    const empty_m_row = helpers.newMaterialRow();
    setMaterials([...material_rows, empty_m_row]);
    console.log(empty_m_row);
  };

  //////////////////////////////////////////////

  const deleteTimer = serv_rowId => {
    setServices(current =>
      current.filter(sr => {
        return sr.id !== serv_rowId;
      })
    );
  };

  const deleteMaterialRow = material_rowId => {
    setMaterials(current =>
      current.filter(mr => {
        return mr.id !== material_rowId;
      })
    );
  };

  const handleEdit = attrs => {
    setServices(prevState => {
      const newState = prevState.map(obj => {
        if (obj.id === attrs.id)
          return Object.assign({}, obj, {
            price: attrs.price,
            count: attrs.count
          });
        return obj;
      });
      return newState;
    });
  };

  const handleEditMaterial = attrs => {
    setMaterials(prevState => {
      const newState = prevState.map(obj => {
        if (obj.id === attrs.id)
          return Object.assign({}, obj, {
            price: attrs.price,
            count: attrs.count
          });
        return obj;
      });
      return newState;
    });
  };

  return (
    <div className="container">
      <EditableTimerList
        serv_rows={serv_rows}
        timers={ServicesData}
        onTrashClick={deleteTimer}
        onEdit={handleEdit}
        onFormSubmit={handleCreateFormSubmit}
        material_rows={material_rows}
        materials={MaterialsData}
        onTrashClickMaterial={deleteMaterialRow}
        onEditMaterial={handleEditMaterial}
        onAddMaterial={handleAddMaterial}
      />
      <MaterialsList
        serv_materials={MaterialsData}
        //material_rows={this.props.material_rows}
      />
    </div>
  );
}

class EditableTimerList extends React.Component {
  render() {
    const serv_rows = this.props.serv_rows.map(serv_row => (
      <Timer
        /*count={serv_row.count}
        price={serv_row.price}*/
        key={serv_row.id}
        id={serv_row.id}
        onTrashClick={this.props.onTrashClick}
        onEdit={this.props.onEdit}
        timers={this.props.timers}
      />
    ));
    const material_rows = this.props.material_rows.map(material_row => (
      <MaterialRow
        /*count={serv_row.count}
        price={serv_row.price}*/
        key={material_row.id}
        id={material_row.id}
        onTrashClickMaterial={this.props.onTrashClickMaterial}
        onEditMaterial={this.props.onEditMaterial}
        materials={this.props.materials}
      />
    ));
    return (
      <div className="row">
        <div className="col">
          <h2 className="d-flex justify-content-center">
            <b>АКТ-КВИТАНЦИЯ</b>
          </h2>
          <p className="d-flex justify-content-center">
            на выполнение дополнительных видов работ (услуг)
          </p>
          <p className="d-flex justify-content-center">
            <b>
              Тарифы на дополнительные виды работ по абонентским пунктам
              Приложение 46. Вводятся с 01 мая 2022 года
            </b>
          </p>
        </div>
        <div id="serv_rows">
          <table className="table table-sm table-bordered border-dark table-striped table-hover m-0">
            <tbody>
              <tr>
                <th scope="col" className="align-middle text-center">
                  Наименование работ (услуг)
                </th>
                <th sscope="col" className="align-middle text-center">
                  Тариф без НДС
                </th>
                <th scope="col" className="align-middle text-center">
                  НДС 20%
                </th>
                <th scope="col" className="align-middle text-center">
                  Тариф с НДС
                </th>
                <th scope="col" className="align-middle text-center">
                  кол-во
                </th>
                <th scope="col" className="align-middle text-center">
                  сумма,р
                </th>
              </tr>
              {serv_rows}
              <TimerForm serv_rows={this.props.serv_rows} />
              <AddServiceButton onFormSubmit={this.props.onFormSubmit} />
              <tr>
                <th scope="col" className="align-middle text-center">
                  Наименование запчастей
                </th>
                <th sscope="col" className="align-middle text-center">
                  Стоим. без НДС
                </th>
                <th scope="col" className="align-middle text-center">
                  НДС 20%
                </th>
                <th scope="col" className="align-middle text-center">
                  Стоим. с НДС
                </th>
                <th scope="col" className="align-middle text-center">
                  кол-во
                </th>
                <th scope="col" className="align-middle text-center">
                  сумма,р
                </th>
              </tr>
              {material_rows}
              <SumMaterials material_rows={this.props.material_rows} />
              <AddMaterialButton onAddMaterial={this.props.onAddMaterial} />
              <TotalSum
                serv_rows={this.props.serv_rows}
                material_rows={this.props.material_rows}
              />
            </tbody>
          </table>
        </div>
        &nbsp;
      </div>
    );
  }
}

function Timer(props) {
  const [price, handleChange] = useState(0);
  const [n, setN] = useState(0);
  //const [count, setCount] = useState("");

  const updateCount = e => {
    setN(e);
    //console.log(e);
    props.onEdit({
      id: props.id,
      price: price,
      count: e
    });
  };

  const updatePrice = e => {
    handleChange(e.target.value);
    props.onEdit({
      id: props.id,
      price: e.target.value,
      count: n
    });
  };

  const handleTrashClick = () => {
    props.onTrashClick(props.id);
  };

  const timers = props.timers;

  return (
    <tr>
      <td>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <select onChange={updatePrice}>
                {timers.map((option, index) => (
                  <option key={index} value={option.price}>
                    {option.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </td>
      <td>{price}</td>
      <td>{price * 0.2}</td>
      <td>{price * 1.2}</td>
      <td></td>
      <td>
        <div className="d-flex justify-content-between">
          {n * price * 1.2}
          <span
            className="pointer"
            onClick={handleTrashClick}
            aria-hidden="true"
          >
            &#x274C;
          </span>
        </div>
      </td>
    </tr>
  );
}

class TimerForm extends React.Component {
  render() {
    const serv_rows = this.props.serv_rows;
    var total = 0;
    for (var i = 0; i < serv_rows.length; i++) {
      total += serv_rows[i].price * serv_rows[i].count;
    }
    //const total = serv_rows.map((serv_row) => (
    //  <div key={this.props.id}>{serv_row.price * serv_row.count}</div>
    //))
    return (
      <tr>
        <td className="align-middle text-right">Итого за работы:</td>
        <td className="td_important">{total}</td>
        <td colSpan="3" className="align-middle text-right">
          рублей в том числе НДС:
        </td>
        <td className="td_important">{total * 1.2}</td>
      </tr>
    );
  }
}
//editable input:
//<input value={this.state.price} onChange={this.handlePriceChange} />

class AddServiceButton extends React.Component {
  render() {
    return (
      <tr>
        <td colSpan="6" className="align-middle text-center">
          <button
            className="addRow_btn font-weight-bold"
            onClick={this.props.onFormSubmit}
          >
            +
          </button>
        </td>
      </tr>
    );
  }
}

function MaterialRow(props) {
  const [price, handleChange] = useState(0);
  const [n, setN] = useState(0);
  //const [count, setCount] = useState("");

  const updateCount = e => {
    setN(e);
    //console.log(e);
    props.onEditMaterial({
      id: props.id,
      price: price,
      count: e
    });
  };

  const updatePrice = e => {
    handleChange(e.target.value);
    props.onEditMaterial({
      id: props.id,
      price: e.target.value,
      count: n
    });
  };

  const handleTrashClick = () => {
    props.onTrashClickMaterial(props.id);
  };

  const materials = props.materials;

  return (
    <tr>
      <td>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <select onChange={updatePrice}>
                {materials.map((option, index) => (
                  <option key={index} value={option.price}>
                    {option.item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </td>
      <td>
        <input
          className="inrow_material_price"
          value={price}
          onChange={updatePrice}
        />
      </td>
      <td>{price * 0.2}</td>
      <td>{price * 1.2}</td>
      <td></td>
      <td>
        <div className="d-flex justify-content-between">
          {n * price * 1.2}
          <span
            className="pointer"
            onClick={handleTrashClick}
            aria-hidden="true"
          >
            &#x274C;
          </span>
        </div>
      </td>
    </tr>
  );
}

class SumMaterials extends React.Component {
  render() {
    const material_rows = this.props.material_rows;
    var total = 0;
    for (var i = 0; i < material_rows.length; i++) {
      total += material_rows[i].price * material_rows[i].count;
    }
    //const total = serv_rows.map((serv_row) => (
    //  <div key={this.props.id}>{serv_row.price * serv_row.count}</div>
    //))
    return (
      <tr>
        <td className="align-middle text-right">Итого за работы:</td>
        <td className="td_important">{total}</td>
        <td colSpan="3" className="align-middle text-right">
          рублей в том числе НДС:
        </td>
        <td className="td_important">{total * 1.2}</td>
      </tr>
    );
  }
}
//editable input:
//<input value={this.state.price} onChange={this.handlePriceChange} />

class AddMaterialButton extends React.Component {
  render() {
    return (
      <tr>
        <td colSpan="6" className="align-middle text-center">
          <button
            className="addRow_btn font-weight-bold"
            onClick={this.props.onAddMaterial}
          >
            +
          </button>
        </td>
      </tr>
    );
  }
}

function TotalSum(props) {
  const material_rows = props.material_rows;
  var total_materials = 0;
  for (var i = 0; i < material_rows.length; i++) {
    total_materials += material_rows[i].price * material_rows[i].count;
  }
  const serv_rows = props.serv_rows;
  var total_serv = 0;
  for (var i = 0; i < serv_rows.length; i++) {
    total_serv += serv_rows[i].price * serv_rows[i].count;
  }
  //const total = serv_rows.map((serv_row) => (
  //  <div key={this.props.id}>{serv_row.price * serv_row.count}</div>
  //))
  return (
    <tr>
      <th scope="col" className="align-middle text-end">
        ИТОГО по Акту-квит.:
      </th>
      <th scope="col" className="td_very_important align-middle text-center">
        {total_materials + total_serv}
      </th>
      <th colSpan="3" scope="col" className="align-middle text-end">
        рублей в том числе НДС:
      </th>
      <th className="td_very_important align-middle text-center">
        {total_materials * 1.2 + total_serv * 1.2}
      </th>
    </tr>
  );
}

function MaterialsList(props) {
  const materials = props.serv_materials;

  const handleShowMaterials = () => {
    props.ShowMaterials();
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-info dropdown-toggle showMaterialsTable_btn"
        onClick={handleShowMaterials}
      >
        Материалы
      </button>

      <table
        className="
            table table-striped table-sm table-bordered
            border-dark
            table-hover
            m-0
          "
      >
        <thead>
          <tr>
            <th scope="col" className="align-middle text-center">
              Наименование
            </th>
            <th scope="col" className="align-middle text-center">
              Стоимость
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="align-middle text-left">
              <input className="material_item" value={materials.item} />
            </td>
            <td>
              <input className="material_price" value={materials.price} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Kvitok;
