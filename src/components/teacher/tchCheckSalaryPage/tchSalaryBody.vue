<template>
<div>
	<div class="spanButton">
		<!-- <select v-model="selYearTerm">
			<option disabled>选择学期</option>
			<option v-for="yearTermOne in yearTerm" :value="yearTermOne">{{yearTermOne}}</option>
		</select>
      	<button class="am-btn am-btn-success am-radius" @click="searchBtn()">查询</button> -->
      	<div class="rpart">
			<button class="am-btn am-btn-success am-radius rightBtn" @click="exportBtn()">导出</button>
		</div>
	</div>

	<div id="salaryBody">
		<div class="salaryContent">
			<table class="normalTable">
				<thead>
					<tr>
						<th width="">职称</th>
						<th width="">课程编号</th>
						<th width="">所授课程</th>
						<th width="">课时</th>
						<th width="">课酬/课时</th>
						<th width="">总课酬</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="data in teacherPayrollList">
						<td>{{data.workUnit}}  {{data.workDuty}}</td>
						<td v-text="data.courseId"></td>
						<td v-text="data.courseName"></td>
						<td v-text="data.courseHours"></td>
						<td v-text="data.payPerCourse"></td>
						<td v-text="data.wage"></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'salaryBody',
	data () {
		return {
			// selYearTerm: '选择学期',
			// yearTerm: [],
			teacherPayrollList: [
				{}
			]
		}
	},
	beforeMount: function() {
        this.$http.post('./checkSalaryByTeacherself',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.teacherPayrollList = data.teacherPayrollList;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
    },
	methods: {
		// // 查询按钮
		// searchBtn: function () {
		// 	this.$http.post('../eduSalary.php',{
		// 		"teacherId": this.selYearTerm
		// 	},{
	 //            "Content-Type":"application/json"
	 //        }).then(function(response){
	 //            console.log("获取申请:");
	 //            console.log(response.body);
	 //            var data = response.body;
	 //            if(data.result == "1") {
  //                   this.teacherPayrollList = data.teacherPayrollList;
  //               }else {
  //                   // alert("操作失败！请重试");
  //                   this.$Message.error('操作失败！请重试');
  //               }
	 //        },function(error){
	 //            console.log("获取申请error:");
	 //            console.log(error);
	 //        });
	 //    },
	    // 下载按钮
	    exportBtn: function () {
	    	location.href = "./downloadteacherSalaryList"
	    }
	}
}
</script>

<style scoped>
.spanButton {
	width: 100%;
	height: 3.5rem;
    line-height: 3.5rem;
	position: relative;
	display: inline-block;
	overflow: hidden;
}
.spanButton button {
	width: 5.6rem;
    margin: 0 0.7rem;
    outline: none;
}
.rpart {
  margin: 0 5rem;
  float: right;
}

#salaryBody {
	width: 100%;
	background-color: #f3f3f3;
	position: relative;
	display: inline-block;
	overflow: auto;
}
.salaryContent {
	text-align: center;
	background-color: white;
	margin: 1rem 5rem;
}
#salary input {
  /*margin: 0.6rem 0;*/
  margin-right: 1.4rem;
}
.buttonPart {
  float: right;
}

</style>