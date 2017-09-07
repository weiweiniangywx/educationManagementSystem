<template>
<div id="authorityMgmt">
	<!-- 角色管理 -->
	<div class="roles">
		<div class="selectCheck">
			<select v-model="role" style="width:8rem;" @change="selRoleListClick()">
				<option disabled>基础角色</option>
		    	<option v-for="selRole in selRoleList" :value="selRole.value">{{ selRole.text }}</option>
		    </select>
			<input v-model="userIdOrName" placeholder="输入姓名或ID" style="width:6rem;" @change="inputUser()">
		</div>
		<!-- 选择基本角色后，从后台返回角色列表 -->
		<div style="overflow:auto; height:27rem;">
			<table class="roleTable tableRowClick">
				<tbody>
					<tr v-for="(person, index) in userList" :key="person">
	<!-- 					<td>
							<input type="checkbox" v-model="personUserId[index]" @on-change="checkUser(index)">
							<Checkbox v-model="personUserId[index]" @on-change="checkUser(index)"></Checkbox>
						</td> -->
						<td @click="checkUser(index)">{{person.userName}}</td>
						<td @click="checkUser(index)">{{person.userId}}</td>
					</tr>
				</tbody>
			</table>
		</div>
		
	</div>
	<div class="authorities">
		<div class="changed">
			<span :value="userIdGet">当前选择：{{userNameShow}}</span>
			<!-- <button class="am-btn am-btn-su-ccess am-radius" @click="changeBtn">修改权限</button> -->
		</div>
		<div class="changedTable">
			<table>
				<tbody>
					<tr v-for="(authority, index) in roleList" :key="authority">
						<td>
							<!-- <input type="checkbox" v-model="authorityRoleId[index]"> -->
							<input type="checkbox" :value="authority.roleId" v-model="authorityRoleId">
							<!-- <Checkbox v-model="authority.roleId[index]"></Checkbox> -->
						</td>
						<td :for="authority.roleId">{{authority.roleName}}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="changedBtn">
			<button class="am-btn am-btn-success am-radius" @click="modal1 = true">保存</button>
			<Modal v-model="modal1" id="modalBody" :styles="{top:'10rem'}">
				<p style="text-align:center; font-size:1.1rem;">您确定修改并保存吗？</p>
				<div slot="footer" style="text-align:center;">
					<Button id="modalBtn" @click="ok1()">确定</Button>
					<Button id="modalBtn" @click="cancel1()">取消</Button>
				</div>
			</Modal>
			<button class="am-btn am-btn-success am-radius" @click="modal2 = true">取消</button>
			<Modal v-model="modal2" id="modalBody" :styles="{top:'10rem'}">
				<p style="text-align:center; font-size:1.1rem;">您确定不保存吗？</p>
				<div slot="footer" style="text-align:center;">
					<Button id="modalBtn" @click="ok2()">确定</Button>
					<Button id="modalBtn" @click="cancel2()">取消</Button>
				</div>
			</Modal>
		</div>

		<Modal v-model="modalResult" id="modalBody" :styles="{top:'10rem'}">
			<div style="text-align:center; font-size:1.1rem;">
			    <p v-if="remindResult === '1'">操作失败！请重试</p>
			    <p v-else-if= "remindResult === '2'">保存成功！</p>
			    <p v-else-if= "remindResult === '3'">保存失败！</p>
			</div>
		    <div slot="footer" style="text-align:center;">
		        <Button id="modalBtn" @click="resultOk()">确认</Button>
		    </div>
		</Modal>
	</div>
</div>
</template>

<script>
export default {
	data () {
		return {
			role: '基础角色',	// 选择角色
			selRoleList: [
				{text: '教师', value: '2'},
				{text: '管理员', value: '3'}
			],
			userIdOrName: '',	//输入姓名或编码
			userNameShow: '',
			userIdGet: '',
			userList: [		// 角色下的人
				{userName: '李华', userId: '123546'},
				{userName: '李华', userId: '123465'},
				{userName: '李华', userId: '123465'},
				{userName: '李华', userId: '123465'},
				{userName: '李华', userId: '123465'},
				{userName: '李华', userId: '123465'},
				{userName: '李华', userId: '123465'},
				{userName: '李华', userId: '123465'},
				{userName: '李华', userId: '123465'},
				{userName: '李华', userId: '123465'},
				{userName: '李华', userId: '123465'}
			],
			roleList: [		// 一人的全部角色数据
				// {roleName: '教师', roleId: '1'},
				// {roleName: '督导', roleId: '2'},
				// {roleName: '自定义角色', roleId: '3'}
			],
			personUserId: [],
			authorityRoleId: [],		// 多选框数组
			modal1: false,		// 保存弹出框
			modal2: false,		// 取消弹出框
			modalResult: false,
			remindResult: ''
		}
	},
	beforeMount: function() {
        this.$http.post('./getAllTeacherAndRole',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.userList = data.allteacherList;
            this.roleList = data.allroleList;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
    },
	methods: {
		// 下拉框-基础角色选择
		selRoleListClick: function () {
    		if (this.role == "选择年制") {
    			this.role = '';
    		}
			this.$http.post('./getRoleUser',{
	        	"roleId": this.role
	        },{    
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            this.userList = data.userList;
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
        	});
		},
		// 输入输入姓名或编码，查找用户
		inputUser: function () {
			this.$http.post('./getUserByIdOrName',{
	        	"userIdOrName": this.userIdOrName
	        },{    
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            if (data.result == "1") {
	            	this.userList = data.userList;
	            }else{
			        // alert("操作失败！请重试");
			        this.modalResult = true;
			        this.remindResult = '1';
			    }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
        	});
		},
		// 选择用户，显示用户的所有角色
		checkUser: function (index) {
			// alert(this.userList[index].userId);
	        // this.authorityRoleId = [1,2];
	        this.userNameShow = this.userList[index].userName;
	        this.userIdGet = this.userList[index].userId;
			this.$http.post('./getUserRole',{
	        	"userId": this.userList[index].userId
	        },{    
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            if (data.result == 1) {
	            	this.authorityRoleId = data.roleIdList;
	            }else{
	            	// alert("操作失败！请重试");
	            	this.modalResult = true;
			        this.remindResult = '1';
	            }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
        	});
		},
		// 保存角色设定********************************************************
		// saveBtn: function () {
		// 	this.$http.post('./setUserRole',{
	 //        	"userId": this.userIdGet,
	 //        	"roleIdList": this.authorityRoleId
	 //        },{    
	 //            "Content-Type":"application/json"
	 //        }).then(function(response){
	 //            console.log("获取申请:");
	 //            console.log(response.body);
	 //            var data = response.body;
	 //            if (data.result == "1") {
	 //            	alert("保存成功！");
	 //            }else{
		// 	        alert("操作失败！请重试");
		// 	    }
	 //        },function(error){
	 //            console.log("获取申请error:");
	 //            console.log(error);
  //       	});
		// },
		ok1 () {
		    this.modal1 = false;
            this.$http.post('./setUserRole',{
	        	"userId": this.userIdGet,
	        	"roleIdList": this.authorityRoleId
	        },{    
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            if (data.result == "1") {
		            this.$Message.success('角色设置保存成功！');
			        // this.remindResult = '2';
	            }else{
			        // this.$Message.error('操作失败！请重试');
	            	this.modalResult = true;
			        this.remindResult = '1';
			    }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
        	});
        },
        cancel1 () {
            this.modal1 = false;
	        this.modalResult = true;
	        this.remindResult = '3';
            this.$http.post('./getUserRole',{
	        	"userId": this.userIdGet
	        },{    
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            if (data.result == 1) {
	            	this.authorityRoleId = data.roleIdList;
                	// this.$Message.success('保存失败！');
	            	this.modalResult = true;
	            	this.remindResult = '3';
                	// this.remindResult = '3';
	            }else{
	            	// alert("操作失败！请重试");
	            	this.modalResult = true;
	            	this.remindResult = '1';
	            }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
        	});
        },
		ok2 () {
            this.modal2 = false;
            this.$http.post('./getUserRole',{
	        	"userId": this.userIdGet
	        },{    
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            this.modalResult = true;
	            if (data.result == 1) {
	            	this.authorityRoleId = data.roleIdList;
               		this.$Message.success('取消成功！');
	            }else{
	            	// alert("操作失败！请重试");
	            	this.remindResult = '1';
	            }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
        	});
        },
        cancel2 () {
            this.modal2 = false;
        },
        resultOk: function () {
        	this.modalResult = false;
        }
	}
}
</script>

<style scoped>
#main {
  /*width: 80%;*/
  margin: 2.7rem 5rem;
  display: flex;
  justify-content: center;
}
.lPart, .rPart {
  margin: 0 3rem;
}

#authorityMgmt {
	padding: 3.5rem 5rem;
    display: flex;
    justify-content: space-between;
}
.roles {
	width: 20rem;
	height: 30em;
	border: 1px solid black;
	padding: 1rem 1rem;
	/*margin-right: 4.5rem;*/
}
.selectCheck {
	padding: 0.5rem;
	border-bottom: 2px solid #158064;
}
.selectCheck select,
.selectCheck input {
	margin: 0 0.7rem;
}
.roleTable {
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;
  border: none;
}
.roleTable > tbody > tr > th,
.roleTable > tbody > tr > td {
  padding: 0.4rem 0rem;
  line-height: 1.6;
}
/*.roleTable th {
  font-size: 0.9rem;
  font-weight: bold;
  background-color: white;
  height: 2rem;
}*/
.roleTable td {
  font-size: 0.5rem;
  height: 2rem;
  text-align: center;
}
/*.roleTable select {
	text-align: center;
	width: 80%;
	height: 1.8rem;
	font-size: 0.8rem;
	outline: none;
	cursor: pointer;
}*/

.authorities {
	width: 47rem;
	height: 30em;
	border: 1px solid black;
	padding: 1rem 1rem;
	/*margin-left: 4.5rem;*/
}
.changed {
	padding: 0.6rem;
	line-height: 1.6;
	border-bottom: 2px solid #158064;
}
.changedTable {
	height: 20rem;
}
.changedTable td {
	padding-right: 1rem;
}
.changedBtn {
	display: flex;
 	justify-content: center;
}
.changedBtn button {
	margin:  0 0.7rem;
	/*width: 5.6rem;*/
}

.tableRowClick > tbody > tr:hover > td {
	cursor: pointer;
	background-color: #f3f3f3;
}

@media screen and (max-width:1023px){
  html{
    font-size: 56%;
  }
}
</style>