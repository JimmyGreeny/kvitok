<br/>
<div class="container border rounded border-dark">
  <form action="form_validation.php" method="post">
<br/>	  
	<div class="form-row justify-content-center">
		<div class="col-6 font-weight-bold text-center bg-danger">Техническая справка №
			<input class="col-3 border-0 list_number bg-warning" name="list_number" type="text" placeholder="номер">
		</div>
	</div>
<br/>
	<div class="form-row">
		<div class="col-12 bg-danger">На
			<select name="list_type">
				<option value="установку">установку</option>
				<option value="переустановку">переустановку</option>
			</select>
			<select name="list_title">
				<option value="Фамилия И.О.">Фамилия И.О.</option>
				<option value="Наим. организации">Наим. организации</option>
			</select>
			<input class="col-4 border_bottom bg-warning" name="list_title_content" type="text" placeholder="имя/организация">
		</div>
	</div>
	<div class="form-row">
		<div class="col-12 bg-danger">Номер телефона:
			<input class="col-2 border_bottom bg-warning premises_ph_number" name="premises_ph_number" type="text" placeholder="(1642)-x-xx-xx">
		</div>
	</div>
	<div class="form-row">
		<div class="col-12 bg-danger">Адрес:
			<select name="settlement_type">
				<option value="город">город</option>
				<option value="пос.">пос.</option>
				<option value="дер.">дер.</option>
				<option value="агр.г.">агр.г.</option>
				<option value="хутор">хутор</option>
			</select>
			<input class="col-4 border_bottom bg-warning" name="settlement_address" type="text" placeholder="напр. Кобрин">
			<select name="location_type">
				<option value="ул.">ул.</option>
				<option value="пер.">пер.</option>
				<option value="пл.">пл.</option>
				<option value="наб.">наб.</option>
				<option value="бул.">бул.</option>
				<option value="пр-кт.">пр-кт.</option>
				<option value="ш.">ш.</option>
				<option value="дор.">дор.</option>
				<option value="туп.">туп.</option>
			</select>
			<input class="col-4 border_bottom bg-warning" name="location_address" type="text" placeholder="напр. Первомайская">
		</div>
    </div>
	<div class="form-row">
		<div class="col-12 bg-danger">Дом №:
			<input class="col-2 border_bottom" name="building" type="text" placeholder=номер>корпус
			<input class="col-2 border_bottom" name="block" type="text" placeholder=номер>кв.
			<input class="col-2 border_bottom" name="premises" type="text" placeholder=номер>
		</div>
    </div>
	<div class="form-row">
		<div class="col-12 bg-danger">Контактные данные:
			<input class="col-3 border_bottom bg-warning contact_clph_number" name="contact_clph_number" type="text" placeholder="(xx)-xxx-xx-xx">
			<input class="col-3 border_bottom bg-warning contact_clph_number" name="contact_clph_number_2" type="text" placeholder="(xx)-xxx-xx-xx">
		</div>
	</div>
<br/>    	
	<div class="form-row justify-content-center">
		<div class="col-12 font-weight-bold text-center bg-danger">ТЕХНИЧЕСКИЕ ДАННЫЕ К УСТАНОВКЕ-ПЕРЕСТАНОВКЕ:</div>
    </div>
    <div class="form-row">
		<div class="col-12 bg-danger">Наличие магистр. пар:
			<select name="m_pairs">
				<option value="есть">есть</option>
				<option value="нет">нет</option>
			</select>
			<input class="col-2 border_bottom bg-warning" name="m_pairs_number" type="text" placeholder=номер>
		</div>
    </div>
    <div class="form-row">
		<div class="col-12 bg-danger">Наличие распред. пар:
			<select name="r_pairs">
				<option value="есть">есть</option>
				<option value="нет">нет</option>
			</select>
			<input class="col-2 border_bottom bg-warning" name="r_pairs_number" type="text" placeholder=номер>
		</div>
    </div>
<br/>
	<div class="form-row">
		<div class="col-12 bg-danger">Объём работ, необходимый выполнить для строительства абонентской линии:</div>
    </div>
	<div class="form-row">
		<textarea class="col-12 form-control font-italic" name="info" type="text" rows="3" placeholder=Сведения></textarea>
    </div>
	<div class="form-row">
		<div class="col-12 bg-danger">Дополнительные сведения:</div>
    </div>
	<div class="form-row">
		<textarea class="col-12 form-control font-italic" name="add_info" type="text" rows="3" placeholder=Сведения></textarea>
    </div>
<br/>
	<div class="form-row">
		<div class="col-12 bg-danger">Дата:
			<input class="col-2 border_bottom datepicker bg-warning" name="data" type="text" placeholder=дата> инженер отдела ТУиП
			<input class="col-2 border_bottom bg-warning" placeholder=подпись>
			<select name="servant">
				<option value="01">Дубинка А.В.</option>
				<option value="02">Никитюк А.М.</option>
				<option value="02">Дубинка В.П.</option>
			</select>
		</div>
	</div>	
<br/>	    
	<div class="form-row">
		<button type="submit" name="submit" class="btn btn-light">Сохранить</button>
    </div>
  </form>
</div>
 
<script src="inputmask_load.js"></script>
