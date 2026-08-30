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
  if (mode === 'hub' || mode === 'cultivate' || mode === 'prep' || mode === 'skills') bg = 'bunk';
  else if (/側門|銀杏|sidemen/.test(blob)) bg = 'sidemen';
  else if (/庫|盤庫|panku|warehouse|夜探|warehouse_/.test(blob)) bg = 'warehouse';
  else if (/通鋪|鋪|bunk|夜深/.test(blob)) bg = 'bunk';
  else if (/外庭|掃|yard|sweep|wang|趙/.test(blob)) bg = 'yard';
  else if (/青陽|鎮|下山|credit/.test(blob)) bg = 'yard';
  else if (mode === 'battle') bg = 'yard';
  else if (mode === 'settle') bg = 'cover';

  let portrait = '';
  let portraitName = '';
  if (/xie|謝承淵/.test(blob)) {
    portrait = 'xie';
    portraitName = '謝承淵';
  } else if (/chen|陳肅|執法堂/.test(blob)) {
    portrait = 'chen';
    portraitName = '陳肅';
  } else if (/wei|衛正言/.test(blob)) {
    portrait = 'wei';
    portraitName = '衛正言';
  } else if (/shoes|xiao|小滿/.test(blob)) {
    portrait = 'xiaoman';
    portraitName = '小滿';
  } else if (/(^|\s)intro(\s|$)|intro_ask|intro_blind|intro_hush|intro_eat|intro_drill|intro_lie|find_he|阿禾/.test(blob)) {
    portrait = 'ahe';
    portraitName = '阿禾';
  }
  return { bg, portrait, portraitName };
}

export function metFaces(flags) {
  const f = flags || {};
  const out = [];
  if (f.he_confides || f.he_bond || f.he_grudge || f.he_fear || f.he_saved || f.he_to_cart || f.willful_blind || f.he_distance || f.breakfast || f.keen || f.lazy) {
    out.push(['ahe', '阿禾']);
  }
  if (f.xie_hold || f.xie_line || f.xie_greet || f.xie_rope || f.xie_eye || f.xie_cover || f.wait_xie) {
    out.push(['xie', '謝承淵']);
  }
  if (f.chen_inform || f.xiao_case || f.admit_self || f.page_to_chen || f.sell_he || f.sell_chen_merit) {
    out.push(['chen', '陳肅']);
  }
  if (f.wei_seen || f.shoes_done || f.chain_done) {
    out.push(['wei', '衛正言']);
  }
  if (f.xiao_alert || f.xiao_case || f.xie_eye || f.ignore_shoes || f.shoes_done) {
    out.push(['xiaoman', '小滿']);
  }
  return out;
}
