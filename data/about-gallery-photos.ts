interface AboutGalleryPhoto {
  id: string
  width: number
  height: number
  category?: 'our-team' | 'asrm' | 'seeds' | 'mhb' | 'families-out-loud'
  altEn: string
  altZh: string
}

// Client-supplied All gallery selection, received November 17, 2026.
// This is a delivery date; event dates and individual identities are not inferred.
export const aboutGalleryPhotos: AboutGalleryPhoto[] = [
  { id: 'team-exhibition-booth', width: 1200, height: 1200, category: 'our-team', altEn: 'Yunda Surrogacy team at an exhibition booth', altZh: 'Yunda Surrogacy 团队在展会展位前的合影' },
  { id: 'asrm-conference-group', width: 1200, height: 1200, category: 'asrm', altEn: 'Group photograph beside an ASRM conference display', altZh: 'ASRM 会议标识旁的活动合影' },
  { id: 'industry-event-colleagues', width: 1080, height: 1080, altEn: 'Three attendees posing together at an industry event', altZh: '三位参会者在行业活动现场合影' },
  { id: 'fol-community-gathering', width: 1080, height: 1080, category: 'families-out-loud', altEn: 'Group gathered around a table at a Families Out Loud event', altZh: 'Families Out Loud 活动中围桌而坐的集体合影' },
  { id: 'office-meeting-portrait', width: 1080, height: 1080, category: 'our-team', altEn: 'Two people posing in the Yunda Surrogacy office', altZh: '两位参加者在 Yunda Surrogacy 办公室合影' },
  { id: 'asrm-group-photo', width: 1080, height: 1080, category: 'asrm', altEn: 'Attendees beside an ASRM conference welcome display', altZh: '参会者在 ASRM 会议欢迎标识旁合影' },
  { id: 'industry-event-group', width: 1080, height: 1080, altEn: 'Group portrait in front of an industry event backdrop', altZh: '行业活动背景板前的集体合影' },
  { id: 'mhb-conference-colleagues', width: 1080, height: 1080, category: 'mhb', altEn: 'Two attendees posing together at an MHB event', altZh: '两位参会者在 MHB 活动现场合影' },
  { id: 'community-event-portrait', width: 1200, height: 1200, altEn: 'Two attendees smiling together at a community event', altZh: '两位参加者在社群活动现场微笑合影' },
  { id: 'families-community-group', width: 1200, height: 1200, altEn: 'Group photograph in front of a Families Out Loud event display', altZh: 'Families Out Loud 活动展示板前的集体合影' },
  { id: 'fol-community-portrait', width: 1080, height: 1080, category: 'families-out-loud', altEn: 'Three attendees posing at a Families Out Loud gathering', altZh: '三位参加者在 Families Out Loud 聚会中合影' },
  { id: 'conference-group-portrait', width: 1080, height: 1080, altEn: 'Four attendees posing together at a conference', altZh: '四位参会者在会议现场合影' },
  { id: 'asrm-booth-portrait', width: 1200, height: 1200, category: 'asrm', altEn: 'Two attendees beside the Yunda Surrogacy conference booth', altZh: '两位参会者在 Yunda Surrogacy 会议展位旁合影' },
  { id: 'office-visit-group', width: 1080, height: 1080, category: 'our-team', altEn: 'Three people posing in front of the Yunda Surrogacy office display', altZh: '三位参加者在 Yunda Surrogacy 办公室展示墙前合影' },
  { id: 'industry-colleague-portrait', width: 1080, height: 1080, category: 'our-team', altEn: 'Two attendees posing together at an industry gathering', altZh: '两位参加者在行业交流活动中合影' },
  { id: 'industry-event-portrait', width: 1080, height: 1440, altEn: 'Three attendees in front of an industry event photo backdrop', altZh: '三位参会者在行业活动摄影背景板前合影' },
  { id: 'office-visit-photo', width: 1080, height: 1080, altEn: 'Two people standing beside the Yunda Surrogacy office wall', altZh: '两位参加者在 Yunda Surrogacy 办公室展示墙旁合影' },
  { id: 'office-visitor-portrait', width: 1080, height: 1080, altEn: 'Three people photographed at the Yunda Surrogacy office', altZh: '三位参加者在 Yunda Surrogacy 办公室合影留念' },
  { id: 'industry-conversation', width: 1200, height: 1200, altEn: 'Two attendees talking beside a Thallo Health event banner', altZh: '两位参加者在 Thallo Health 活动展示牌旁交流' },
  { id: 'evening-event-portrait', width: 1080, height: 1080, altEn: 'Two attendees posing together at an evening event', altZh: '两位参加者在晚间活动现场合影' },
  { id: 'resolve-event-group', width: 1080, height: 1080, altEn: 'Group portrait in front of a RESOLVE event backdrop', altZh: 'RESOLVE 活动背景板前的合影' },
  { id: 'asrm-baltimore-portrait', width: 1080, height: 1080, category: 'asrm', altEn: 'Attendee beside an ASRM Baltimore welcome display', altZh: '参会者在 ASRM 巴尔的摩欢迎标识旁留影' },
  { id: 'conference-hall-conversation', width: 1080, height: 1080, altEn: 'Two attendees in conversation in a conference exhibition hall', altZh: '两位参会者在会议展览大厅交流' },
  { id: 'mhb-conference-presentation', width: 1080, height: 1080, category: 'mhb', altEn: 'Attendees watching a presentation at an MHB event', altZh: '参会者在 MHB 活动中观看介绍' },
  { id: 'asrm-conference-display', width: 1200, height: 1200, category: 'asrm', altEn: 'Attendees posing beside a large ASRM conference sign', altZh: '参会者在大型 ASRM 会议标识旁合影' },
  { id: 'exhibition-team-conversations', width: 1080, height: 1350, altEn: 'Collage of conversations at the Yunda Surrogacy exhibition booth', altZh: 'Yunda Surrogacy 展位交流场景拼图' },
  { id: 'conference-booth-conversation', width: 1080, height: 1350, altEn: 'Visitors in conversation at a Yunda Surrogacy conference booth', altZh: '访客在 Yunda Surrogacy 会议展位交流' },
  { id: 'exhibition-booth-visit', width: 1080, height: 1350, altEn: 'Attendees meeting at the Yunda Surrogacy exhibition booth', altZh: '参会者在 Yunda Surrogacy 展会展位会面' },
  { id: 'exhibit-booth-collage', width: 1049, height: 1349, altEn: 'Collage of visitors and conversations at a Yunda Surrogacy booth', altZh: 'Yunda Surrogacy 展位访客与交流场景拼图' },
  { id: 'mhb-event-conversations', width: 1080, height: 1080, category: 'mhb', altEn: 'Collage of attendees talking at an MHB industry event', altZh: '参会者在 MHB 行业活动中交流的场景拼图' },
  { id: 'community-event-collage', width: 1080, height: 1080, altEn: 'Collage of participants and group activities at a community gathering', altZh: '社群聚会中的参加者与集体活动拼图' },
  { id: 'office-welcome-area', width: 1080, height: 1080, altEn: 'Yunda Surrogacy office seating and welcome area', altZh: 'Yunda Surrogacy 办公室座椅与接待区域' },
  { id: 'office-welcome-sign', width: 1080, height: 1080, altEn: 'Welcome sign inside the Yunda Surrogacy office', altZh: 'Yunda Surrogacy 办公室内的欢迎标识' },
  { id: 'exhibit-materials-display', width: 1080, height: 1080, altEn: 'Yunda Surrogacy brochures and exhibition materials', altZh: 'Yunda Surrogacy 宣传册与展会展示物料' },
  { id: 'branded-event-materials', width: 1080, height: 1080, altEn: 'Yunda Surrogacy branded bags and printed event materials', altZh: 'Yunda Surrogacy 品牌手袋与活动印刷物料' },
]
