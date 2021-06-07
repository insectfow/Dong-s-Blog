import Vue from 'vue';
import VueCroppie from 'vue-croppie';
import 'croppie/croppie.css' // import the croppie css manually
const maxSize = 1024 * 1024 * 5;
const fileForm = [
    {
        id: 0,
        name: '인플루언서 모집가이드 메인 사진',
        data: 'campaignCode-g-0',
        width: 450,
        height: 508
    },
    {
        id: 1,
        name: '인플루언서 모집가이드 상세1',
        data: 'campaignCode-g-1',
        width: 360,
        height: 670
    },
    {
        id: 2,
        name: '인플루언서 모집가이드 상세2',
        data: 'campaignCode-g-2',
        width: 360,
        height: 670
    },
    {
        id: 3,
        name: '인플루언서 모집가이드 상세3',
        data: 'campaignCode-g-3',
        width: 360,
        height: 670
    },
    {
        id: 4,
        name: '인플루언서 모집가이드 상세4',
        data: 'campaignCode-g-4',
        width: 360,
        height: 670
    },
    {
        id: 5,
        name: '인플루언서 모집가이드 포스팅 참고사례',
        data: 'campaignCode-g-5',
        width: 450,
        height: 300
    },
    {
        id: 6,
        name: '공구샵 개설 메인이미지',
        data: 'campaignCode-s-0',
        width: 450,
        height: 508
    },
    {
        id: 7,
        name: '공구샵 상품 소개1',
        data: 'campaignCode-s-1',
        width: 360,
        height: 670
    },
    {
        id: 8,
        name: '공구샵 상품 소개2',
        data: 'campaignCode-s-2',
        width: 360,
        height: 670
    },
    {
        id: 9,
        name: '공구샵 상품 소개3',
        data: 'campaignCode-s-3',
        width: 360,
        height: 670
    },
    {
        id: 10,
        name: '공구샵 상품 소개4',
        data: 'campaignCode-s-4',
        width: 360,
        height: 670
    },
    {
        id: 11,
        name: '공구샵 상품 소개 디테일',
        data: 'campaignCode-s-5-idx',
        width: 450,
        height: 300 
    },
    {
        id: 12,
        name: '광고주 브랜드 대표이미지',
        data: 'clientId-brandIdx-b-0',
        width: 500,
        height: 500 
    },
    {
        id: 13,
        name: '광고주 브랜드 로고',
        data: 'clientId-brandIdx-b-1',
        width: 140,
        height: 140 
    },
    {
        id: 14,
        name: '캠페인 가이드 작성 콘텐츠 예시 이미지',
        data: 'campaignCode-highClassIdx-middleClassIdx-issueIdx-contentIdx-idx', // issueIdx 0은 사전이슈잉 1은 공구포스팅용
        width: 750,
        height: 500 
    }
]
const campaignCode = 'r-22310230123';
const influencerId = 'ehdgus96';
const clientId = 'ehdgus11';
const brandIdx = 2302;
const highClassIdx = 1222;
const middleClassIdx = 120;
const issueIdx = 0;
const contentIdx = 234;
let images = null;

Vue.use(VueCroppie);

Vue.prototype.croppieAlart = (idx, imgIdx, callBack) => {
    alert = true;
    switch (idx) {
        case 0:
            callBack('이미지 사이즈 5MB 이하로 업로드해 주세요', alert);
            break;
        case 1:
            callBack('png, jpg, bmp 이미지 파일만 업로드 가능해요', alert);
            break;
        case 2:
            callBack(`width가 ${fileForm[imgIdx].width}px 보다 작거나, height가 ${fileForm[imgIdx].height}px 보다 작다.`, alert)
            break;
        default:
            break;
    }
}
Vue.prototype.dataURLToBlob = (dataURL, name) =>  {
    const BASE64_MARKER = ';base64,';

    // base64로 인코딩 되어있지 않을 경우
    if (dataURL.indexOf(BASE64_MARKER) === -1) {
        const parts = dataURL.split(',');
        const contentType = parts[0].split(':')[1];
        const raw = parts[1];
        return new Blob([raw], {
            type: contentType
        });
    }
    // base64로 인코딩 된 이진데이터일 경우
    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];

    const raw = window.atob(parts[1]);
    // atob()는 Base64를 디코딩하는 메서드
    const rawLength = raw.length;
    // 부호 없는 1byte 정수 배열을 생성
    const uInt8Array = new Uint8Array(rawLength); // 길이만 지정된 배열
    let i = 0;
    while (i < rawLength) {
        uInt8Array[i] = raw.charCodeAt(i);
        i++;
    }
    const blob = new Blob([uInt8Array], {
        type: contentType
    });
    return new File([blob], name, { type: contentType });
}


// 사용안함
Vue.prototype.imageFileName = (data) => {
    if (!data) return;
    const str = data.data;
    // let re_str;
    let re_str = str
    .replace(/campaignCode/g, campaignCode)
    .replace(/influencerId/g, influencerId)
    .replace(/clientId/g, clientId)
    .replace(/brandIdx/g, brandIdx)
    .replace(/highClassIdx/g, highClassIdx)
    .replace(/contentIdx/g, contentIdx)
    .replace(/issueIdx/g, issueIdx)
    .replace(/middleClassIdx/g, middleClassIdx);

    return re_str + '.jpg';
}