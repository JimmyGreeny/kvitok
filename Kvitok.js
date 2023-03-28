import React, { useState, useEffect } from "react";
import axios from "axios";
import "./kvitok/style.css";
import helpers from "./kvitok/helpers.js";
import InputSpinner from "./kvitok/InputSpinner.js";
import ServicesData from "./kvitok/services.json";
//import MaterialsData from "./kvitok/materials.json";

function Kvitok() {
  const s_VATpercent = 20;
  const m_VATpercent = 20;

  const [serv_rows, setServices] = useState([]);
  const handleAddService = () => {
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

  const [materials, setMaterial] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8082/api/books')
      .then((res) => {
        setMaterial(res.data);
      })
      .catch((err) => {
        console.log('Error from ShowBookList');
      });
  }, [materials]);

  const handleAddNewMaterial = () => {
    const empty_m = helpers.newMaterial();
    //setMaterial([...materials, empty_m]);
    console.log(empty_m);

    axios
    .post('http://localhost:8082/api/books', empty_m)
    .catch((err) => {
      console.log('Error in CreateBook!');
    });
  };

  const handleEditMaterialPrice = attrs => {
    const data = {
      price: attrs.price
    };
    //console.log(data);
    //console.log(attrs.item_id);
    axios
    .put(`http://localhost:8082/api/books/${attrs.item_id}`, data)
    .catch((err) => {
      console.log('Error in UpdateBooklPrice!');
    });

    //setMaterial(prevState => {
    //  const newState = prevState.map(obj => {
    //    if (obj.id == attrs.item_id)
    //      return Object.assign({}, obj, {
    //        price: attrs.price
    //      });
    //    return obj;
    //  });
    //  return newState;
    //});
    setMaterials(prevState => {
      const newState = prevState.map(obj => {
        if (obj.item_id === attrs.item_id)
          return Object.assign({}, obj, {
            price: attrs.price
          });
        return obj;
      });
      return newState;
    });
  };

  const handleEditMaterialItem = attrs => {
    const data = {
      item: attrs.item
    };

    axios
    .put(`http://localhost:8082/api/books/${attrs.item_id}`, data)
    .catch((err) => {
      console.log('Error in UpdateBookInfo!');
    });
    //console.log(attrs.item_id)
    //console.log(attrs.item)

    //setMaterial(prevState => {
    //  const newState = prevState.map(obj => {
    //    if (obj.id === attrs.item_id)
    //     return Object.assign({}, obj, {
    //        item: attrs.item
    //      });
    //    return obj;
    //  });
    //  return newState;
    //});
  };


  //////////////////////////////////////////////

  const deleteServiceRow = serv_rowId => {
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

  const deleteMaterialItem = materialItem_rowId => {
    //setMaterial(current =>
    //  current.filter(mr => {
    //    return mr.id !== materialItem_rowId;
    //  })
    //);

    axios
    .delete(`http://localhost:8082/api/books/${materialItem_rowId}`)
    .catch((err) => {
      console.log('Error form deleteClick');
    });
  };

  const handleEditService = attrs => {
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
            count: attrs.count,
            item_id: attrs.item_id
          });
        return obj;
      });
      return newState;
    });
  };

  return (
    <div className="container">
      <KvitokList
        serv_rows={serv_rows}
        services={ServicesData}
        onTrashClickService={deleteServiceRow}
        onEditService={handleEditService}
        onAddService={handleAddService}
        s_VATpercent={s_VATpercent}
        material_rows={material_rows}
        materials={materials}
        onTrashClickMaterial={deleteMaterialRow}
        onEditMaterial={handleEditMaterial}
        handleEditMaterialPrice={handleEditMaterialPrice}
        onAddMaterial={handleAddMaterial}
        m_VATpercent={m_VATpercent}
      />
      <MaterialsList
        serv_materials={materials}
        onEditMaterial={handleEditMaterialPrice}
        onEditMaterialItem={handleEditMaterialItem}
        //material_rows={this.props.material_rows}
        onAddNewMaterial={handleAddNewMaterial}
        onTrashClickMaterialItem={deleteMaterialItem}
      />
    </div>
  );
}

function KvitokList(props) {
  const serv_rows = props.serv_rows.map(serv_row => (
    <ServiceRow
      key={serv_row.id}
      id={serv_row.id}
      onTrashClickService={props.onTrashClickService}
      onEditService={props.onEditService}
      services={props.services}
      s_VATpercent={props.s_VATpercent}
    />
  ));
  const material_rows = props.material_rows.map(material_row => (
    <MaterialRow
      key={material_row.id}
      id={material_row.id}
      item_id={material_row.item_id}
      onTrashClickMaterial={props.onTrashClickMaterial}
      onEditMaterial={props.onEditMaterial}
      handleEditMaterialPrice={props.handleEditMaterialPrice}
      materials={props.materials}
      m_VATpercent={props.m_VATpercent}
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
        <table className="table table-sm table-bordered table-striped table-hover m-0">
          <tbody>
            <tr>
              <th scope="col" className="align-middle text-center">
                Наименование работ (услуг)
              </th>
              <th sscope="col" className="align-middle text-center">
                Тариф без НДС
              </th>
              <th scope="col" className="align-middle text-center">
                НДС {props.s_VATpercent}%
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
            <SumRows rows={props.serv_rows} VATpercent={props.s_VATpercent} />
            <AddSorMRowButton onAddRow={props.onAddService} />
            <tr>
              <th scope="col" className="align-middle text-center">
                Наименование запчастей
              </th>
              <th sscope="col" className="align-middle text-center">
                Стоим. без НДС
              </th>
              <th scope="col" className="align-middle text-center">
                НДС {props.m_VATpercent}%
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
            <SumRows
              rows={props.material_rows}
              VATpercent={props.m_VATpercent}
            />
            <AddSorMRowButton onAddRow={props.onAddMaterial} />
            <TotalSum
              serv_rows={props.serv_rows}
              material_rows={props.material_rows}
              sVATpercent={props.s_VATpercent}
              mVATpercent={props.m_VATpercent}
            />
          </tbody>
        </table>
      </div>
      &nbsp;
    </div>
  );
}

function ServiceRow(props) {
  const s_VATpercent = props.s_VATpercent;
  const vat = 1 + s_VATpercent / 100;
  const [price, handleChange] = useState(0);
  const [n, setN] = useState(0);
  //const [count, setCount] = useState("");

  const updateCount = e => {
    setN(e);
    //console.log(e);
    props.onEditService({
      id: props.id,
      price: price,
      count: e
    });
  };

  const updatePrice = e => {
    handleChange(e.target.value);
    props.onEditService({
      id: props.id,
      price: e.target.value,
      count: n
    });
  };

  const handleTrashClick = () => {
    props.onTrashClickService(props.id);
  };

  const services = props.services;

  return (
    <tr>
      <td>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <select onChange={updatePrice} defaultValue="">
                  <option></option>
                {services.map((option, index) => (
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
      <td>{(price * (vat - 1)).toFixed(2)}</td>
      <td>{(price * vat).toFixed(2)}</td>
      <td>
        <InputSpinner step={1.0} onChange={count => updateCount(count)} />
      </td>
      <td>
        <div className="d-flex justify-content-between">
          {(n * price * vat).toFixed(2)}
          <span
            className="pointer"
            onClick={handleTrashClick}
            aria-hidden="true"
            role="img"
            aria-label="x"
          >
            &#x274C;
          </span>
        </div>
      </td>
    </tr>
  );
}

function SumRows(props) {
  const rows = props.rows;
  const VATpercent = props.VATpercent;
  const vat = 1 + VATpercent / 100;
  var total = 0;
  for (var i = 0; i < rows.length; i++) {
    total += rows[i].price * rows[i].count;
  }
  //const totalWithVAT = (total * vat).toFixed(2)
  //const total = serv_rows.map((serv_row) => (
  //  <div key={this.props.id}>{serv_row.price * serv_row.count}</div>
  //))
  return (
    <tr>
      <td className="align-middle text-right">Итого за работы:</td>
      <td className="td_important">{total.toFixed(2)}</td>
      <td colSpan="3" className="align-middle text-right">
        рублей в том числе НДС:
      </td>
      <td className="td_important">{(total * vat).toFixed(2)}</td>
    </tr>
  );
}
//editable input:
//<input value={this.state.price} onChange={this.handlePriceChange} />

function AddSorMRowButton(props) {
  return (
    <tr>
      <td colSpan="6" className="align-middle text-center">
        <button
          className="addRow_btn font-weight-bold"
          onClick={props.onAddRow}
        >
          +
        </button>
      </td>
    </tr>
  );
}

function MaterialRow(props) {
  const m_VATpercent = props.m_VATpercent;
  const vat = 1 + m_VATpercent / 100;
  
  //const [price, handleChange] = useState(0);
  const [n, setN] = useState(0);
  //const [inpkey, setInpkey] = useState(0);
  //const [count, setCount] = useState("");
  const materials = props.materials;

  const init_price = materials
  .filter(material => material._id === props.item_id)
  .map(filteredMaterial => filteredMaterial.price)
  
  const material_id = materials
  .filter(material => material._id === props.item_id)
  .map(filteredMaterial => filteredMaterial._id)

  //const VATamount = (init_price * (vat - 1)).toFixed(2)
  //const priceWithVAT = (init_price * vat).toFixed(2)
  //const rowValue = (n * init_price * vat).toFixed(2)

  const updateCount = e => {
    setN(e);
    //console.log(e);
    props.onEditMaterial({
      id: props.id,
      price: init_price,
      count: e,
      item_id: props.item_id
    });
  };

  const updatePrice = e => {
    const selected_price = materials
    .filter(material => material._id === e.target.value)
    .map(filteredMaterial => filteredMaterial.price)
    //handleChange(e.target.value);
    //setInpkey(e.target.selectedIndex);
    props.onEditMaterial({
      id: props.id,
      price: selected_price,
      count: n,
      item_id: e.target.value
    });
    console.log(e.target.value);
  };

  const updateOnlyPrice = e => {////////should be changed!!!!!!
    //handleChange(e.target.value);
    //setInpkey(e.target.selectedIndex);
    props.handleEditMaterialPrice({
      item_id: material_id,
      price: e.target.value
    });
      //console.log(props.item_id);
  };

  const handleTrashClick = () => {
    props.onTrashClickMaterial(props.id);
  };

  

  return (
    <tr>
      <td>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <select onChange={updatePrice} defaultValue="">
                  <option></option>
                {materials.map((option, index) => (
                  <option key={index} value={option._id}>
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
          value={init_price}
          onChange={updateOnlyPrice}
        />
      </td>
      <td>{(init_price * (vat - 1)).toFixed(2)}</td>
      <td>{(init_price * vat).toFixed(2)}</td>
      <td>
        <InputSpinner step={0.5} onChange={count => updateCount(count)} />
      </td>
      <td>
        <div className="d-flex justify-content-between">
          {(n * init_price * vat).toFixed(2)}
          <span
            className="pointer"
            onClick={handleTrashClick}
            aria-hidden="true"
            role="img"
            aria-label="x"
          >
            &#x274C;
          </span>
        </div>
      </td>
    </tr>
  );
}

function TotalSum(props) {
  const sVATpercent = props.sVATpercent;
  const mVATpercent = props.mVATpercent;
  const svat = 1 + sVATpercent / 100;
  const mvat = 1 + mVATpercent / 100;

  const material_rows = props.material_rows;
  var total_materials = 0;
  for (var i = 0; i < material_rows.length; i++) {
    total_materials += material_rows[i].price * material_rows[i].count;
  }
  const serv_rows = props.serv_rows;
  var total_serv = 0;
  for (i = 0; i < serv_rows.length; i++) {
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
        {(total_materials + total_serv).toFixed(2)}
      </th>
      <th colSpan="3" scope="col" className="align-middle text-end">
        рублей в том числе НДС:
      </th>
      <th className="td_very_important align-middle text-center">
        {(total_materials * mvat + total_serv * svat).toFixed(2)}
      </th>
    </tr>
  );
}

function MaterialsList(props) {
  const materials = props.serv_materials.map(material => (
    <MaterialsDBRow
      key={material._id}
      item_id={material._id}
      //onTrashClickService={props.onTrashClickService}
      //onEditService={props.onEditService}
      item={material.item}
      price={material.price}
      onEditMaterial={props.onEditMaterial}
      onEditMaterialItem={props.onEditMaterialItem}
      onAddNewMaterial={props.onAddNewMaterial}
      onTrashClickMaterialItem={props.onTrashClickMaterialItem}
    />
  ));

  //const handleShowMaterials = () => {};

  return (
    <div>
      <button
        type="button"
        className="btn btn-info showMaterialsTable_btn" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"
      >
        Материалы
      </button>

      <table
        className="
            table table-striped table-sm table-bordered
            table-hover
            m-0
            collapse
          "
          id="collapseExample"
      >
        <tbody>
          <tr>
            <th scope="col" colSpan="5" className="align-middle text-center">
              Наименование
            </th>
            <th scope="col" className="align-middle text-center">
              Стоимость
            </th>
          </tr>
        {materials}
        <AddSorMRowButton onAddRow={props.onAddNewMaterial} />
        </tbody>
      </table>
    </div>
  );
}

function MaterialsDBRow(props) {
  //const [price, changePrice] = useState(props.price);
  const [item, changeItem] = useState(props.item);

  const updateItem = e => {
    changeItem(e.target.value);
    props.onEditMaterialItem({
      item_id: props.item_id,
      item: e.target.value,
      //price: price
    });
  };

  const updatePrice = e => {
    //changePrice(e.target.value);
    props.onEditMaterial({
      item_id: props.item_id,
      //item: item,
      price: e.target.value
    });
  };

  const handleTrashClickMaterialItem = () => {
    props.onTrashClickMaterialItem(props.item_id);
  };

  return (
    <tr>
      <td className="align-middle text-left" colSpan="5">
        <input className="material_item" value={item} onChange={updateItem} />
      </td>
      <td className="d-flex justify-content-between">
        <input
          className="material_price"
          value={props.price || ''}
          onChange={updatePrice}
        />
        <span
          className="pointer"
          onClick={handleTrashClickMaterialItem}
          aria-hidden="true"
          role="img"
          aria-label="x"
        >&#x274C;</span>
      </td>
    </tr>
  );
}

export default Kvitok;
//lsof -i tcp:3000
//kill -9 15640
