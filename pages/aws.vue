<template>
  <div class="aws-page">
    <div class="aws-note">
        <h2>Elastic Load Balancing</h2>
        <p>둘 이상의 가용 영역에서 EC2 인스턴스, 컨테이너, IP 주소 등 여러 대상에 걸쳐 수신되는 트래픽을 자동으로 분산합니다.</p>
    </div>
    <div class="aws-note">
        <h2>이점</h2>
        <ul>
            <li>로드 밸런서는 워크로드를 가상 서버와 같은 다수의 컴퓨팅 리소스로 분산합니다.</li>
            <li>로드 밸런서를 사용하면 애플리케이션의 가용성과 내결함성이 높아집니다.</li>
            <li>애플리케이션에 대한 요청의 전체적인 흐름을 방해하지 않고 필요에 따라 로드 밸런서에서 컴퓨팅 리소스를 추가 및 제거할 수 있습니다.</li>
            <li>로드 밸런서가 정상적인 대상에만 요청을 보내도록 컴퓨팅 리소스의 상태를 모니터링하는 상태 확인을 구성할 수 있습니다.</li>
            <li>컴퓨팅 리소스가 주요 작업에 집중할 수 있도록 암호화 및 복호화 작업을 로드 밸런서로 오프로드할 수 있습니다.</li>
        </ul>
    </div>
    <div class="aws-note">
        <h2>기능</h2>
        <p>Elastic Load Balancing는 Application Load Balancer, Network Load Balancer, Gateway Load Balancers 및 Classic Load Balancer 로드 밸런서를 지원합니다.</p>
    </div>
    <div class="aws-note">
        <h2></h2>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.aws-note {
    width: 1200px;
    margin: 20px auto;
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #000;
    background: #fff;
}
.aws-note > h2 {
    font-size: 1.4rem;
    display: inline-block;
    padding-bottom: 5px;
    margin-bottom: 15px;
    border-bottom: 1px solid #000;
}
.aws-note > p {
    font-size: 0.8rem;
    line-height: 1.5;
}
.aws-note > ul {
    padding: 10px;
}
.aws-note > ul > li {
    font-size: 0.8rem;
    margin-bottom: 10px;
}
</style>