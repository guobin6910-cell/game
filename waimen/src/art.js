import cover from './assets/art/cover.jpg';
import yard from './assets/art/yard.jpg';
import sidemen from './assets/art/sidemen.jpg';
import warehouse from './assets/art/warehouse.jpg';
import bunk from './assets/art/bunk.jpg';
import ahe from './assets/art/ahe.jpg';
import xie from './assets/art/xie.jpg';
import chen from './assets/art/chen.jpg';
import wei from './assets/art/wei.jpg';
import xiaoman from './assets/art/xiaoman.jpg';

export const PORTRAITS = { ahe, xie, chen, wei, xiaoman };
export const BACKGROUNDS = { cover, yard, sidemen, warehouse, bunk };

export function artFor(mode, sceneId, scene) {
  const blob = `${mode || ''} ${sceneId || ''} ${scene?.loc || ''}`;
  let bg = 'cover';
  if (mode === 'hub' || mode === 'cultivate' || mode === 'prep' || mode === 'skills') {
    bg = /舊宅|燈節|火中|夜襲|山道/.test(blob) ? 'cover' : 'bunk';
  } else if (/側門|銀杏|sidemen/.test(blob)) bg = 'sidemen';
  else if (/滅門|火中|夜襲|昏厥|清繳|殘香/.test(blob)) bg = 'cover';
  else if (/庫|盤庫|藥圃|夜探|火漆|黃耆|warehouse/.test(blob)) bg = 'warehouse';
  else if (/道觀|通鋪|鋪|bunk|夢回|夜深|山門|雨中|觀門/.test(blob)) bg = 'bunk';
  else if (/外庭|試煉|試劍|站樁|小比|yard|趙|掃/.test(blob)) bg = 'yard';
  else if (/青陽|鎮|下山|舊姓/.test(blob)) bg = 'yard';
  else if (/禁林|關內|後山/.test(blob)) bg = 'sidemen';
  else if (mode === 'battle') bg = /庫|夜探|火/.test(blob) ? 'warehouse' : 'yard';
  else if (mode === 'settle') bg = 'cover';

  let portrait = '';
  let portraitName = '';
  if (/謝承淵/.test(blob)) {
    portrait = 'xie';
    portraitName = '謝承淵';
  } else if (/陳肅|執法堂/.test(blob)) {
    portrait = 'chen';
    portraitName = '陳肅';
  } else if (/衛正言/.test(blob)) {
    portrait = 'wei';
    portraitName = '衛正言';
  } else if (/小滿/.test(blob)) {
    portrait = 'xiaoman';
    portraitName = '小滿';
  } else if (/阿禾/.test(blob)) {
    portrait = 'ahe';
    portraitName = '阿禾';
  }
  return { bg, portrait, portraitName };
}

export function metFaces(flags) {
  const f = flags || {};
  const out = [];
  if (f.met_ahe || f.he_bond || f.he_grudge || f.he_saved || f.he_to_cart || f.ch7_done) {
    out.push(['ahe', '阿禾']);
  }
  if (f.met_xie || f.ch17_done) {
    out.push(['xie', '謝承淵']);
  }
  if (f.met_chen || f.ch10_done) {
    out.push(['chen', '陳肅']);
  }
  if (f.met_wei || f.ch23_done) {
    out.push(['wei', '衛正言']);
  }
  if (f.met_xiaoman || f.ch9_done) {
    out.push(['xiaoman', '小滿']);
  }
  return out;
}
