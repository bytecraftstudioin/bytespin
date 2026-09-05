import Script from "next/script";

export default function HilltopAd() {
  return (
    <div className="w-full flex justify-center">
      <Script
        id="hilltopads-zone-7387277"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(fdm){
              var d = document,
                  s = d.createElement('script'),
                  l = d.scripts[d.scripts.length - 1];

              s.settings = fdm || {};
              s.src = "//relieved-understanding.com/b_XVVbs.dXGMlR0VYbWpcj/Ie/mx9NumZQUBlIklP/T/cvzVO/DWcTyON/zSc-txNmzYMJ4LNIzUIs4UMSQl";
              s.async = true;
              s.referrerPolicy = 'no-referrer-when-downgrade';

              l.parentNode.insertBefore(s, l);
            })({})
          `,
        }}
      />
    </div>
  );
}