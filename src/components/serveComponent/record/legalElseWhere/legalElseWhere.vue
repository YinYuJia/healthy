<template>
	<div class="legalElseWhere">
		<div class="Content">
			<!-- 搜索框 -->
			<div class="SearchContent" id="searchContent">
				<div class="SearchBox">
					<svg-icon icon-class="serveComponent_search" />
					<input class="InputContent"  :placeholder="'请输入身份证号'" />
					<svg-icon class="deleteIcon" @click="deleteSearch()" icon-class="serveComponent_delete"></svg-icon>
					<div class="SearchBtn" @click="search">搜索</div>
				</div>
			</div>
			<!-- 用户基本信息 -->
			<div class="userBaseInfo">
                <div class="infoBox">
                    <svg-icon icon-class="payLimit_bg"/>
                    <div class="infoName">
                        <span class="name"></span>
                        <span class="sex">/{{form1.AAC004|AAC004}}</span>
                    </div>
                    <div class="infoAddress">
                        <div class="IconImg">
                            <svg-icon icon-class="payLimit_compony"/>
                        </div>
                        <span>{{form1.AAB004}}</span>
                    </div>
                    <div class="infoMessage">
                        <div class="birth">
                            <div class="infoMessageBirth">{{form1.AAC006}}</div>
                            <div class="infoMessageText">出生日期</div>
                        </div>
                        <div class="work">
                            <div class="infoMessageWork">{{form1.AAC007}}</div>
                            <div class="infoMessageText">参加工作时间</div>
                        </div>
                    </div>
                </div>
            </div>
		</div>
		
	</div>
</template>

<script>
export default {

};
</script>

<style lang="less" scoped>
.legalElseWhere{
	.Content{
		height: 100%;
        margin-bottom: 1.4rem;
        .SearchContent {
                height: 1.18rem;
                width: 7.5rem;
                background: #fff;
                display: flex;
                justify-content: center;
                align-items: flex-end;
            .SearchBox {
                position: relative;
                height: 0.8rem;
                width: 7rem;
                padding: 0 0.15rem;
                border: 0.01rem solid #1492ff;
                border-radius: 0.05rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
				.svg-icon {
					height: 0.5rem;
					width: 0.5rem;
				}
				.InputContent {
					height: 0.49rem;
					width: 4.1rem;
					font-size: 0.26rem;
					border: none;
					&::placeholder {
					color: #c9c9c9;
					}
				}
				.deleteIcon{
					height: .4rem;
					width: .4rem;
					position: absolute;
					right: 1.2rem;
				}
				.SearchBtn {
					height: 0.49rem;
					width: 0.99rem;
					margin-left: .2rem;
					background: #1492ff;
					border-radius: 0.04rem;
					color: white;
					font-size: 0.26rem;
					line-height: 0.49rem;
					letter-spacing: 0;
				}
            }
		}
		// 用户基本信息
		.userBaseInfo{
            margin-top: .15rem;
            height: 3rem;
            width: 7.5rem;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            position: relative;
            z-index: -2;
            .infoBox{
                font-size: .3rem;
                position: relative;
                height: 100%;
                width: 7rem;
                padding: 0 .15rem;
                color: #ffffff;
                border-radius: 0.05rem;
                display: flex;
                flex-direction: column;
                align-items: left;
                .svg-icon{
                    display: block;
                    width:100%;
                    height: 100%;
                    position: absolute;
                    left:0;
                    z-index: -1;
                }
                .infoName{
                    width: 5rem;
                    height: .5rem;
                    text-align: left;
                    margin-top: .35rem;
                    margin-left: .2rem;
                    .name{
                        font-size: .4rem;
                    }
                    .sex{
                        font-size: .24rem;
                    }
                }
                .infoAddress{
                    margin-top: .2rem;
                    width: 5rem;
                    text-align: left;
                    padding-left: .3rem;
                    span{
                        line-height:.4rem;
                        height: .4rem;
                        font-size: .24rem;
                    }
                    .IconImg{
                        width: .4rem;
                        height: .4rem;
                        display: inline-block;
                        
                        .svg-icon{
                            padding-left: .3rem;
                            display:block;
                            width: .4rem;
                            height: .4rem;
                          
                        }
                    }
                }
                .infoMessage{
                    display: flex;
                    justify-content: space-around;
                    height: 1.8rem;
                    .birth{
                        display: flex;
                        flex-direction: column;
                        .infoMessageBirth{
                            height: .8rem;
                            line-height: .8rem;
                        }
                        .infoMessageText{
                            font-size: .24rem;
                        }
                    }
                    .work{
                        .infoMessageWork{
                            height: .8rem;
                            line-height: .8rem;
                        }
                        .infoMessageText{
                            font-size: .24rem;
                        }
                    }
                }
            }
        }
	}
}
</style>