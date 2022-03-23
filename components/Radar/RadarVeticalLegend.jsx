import { useStore } from "../../store.js";
import { activitiesArray, colorByCategory } from "../utils";

{
  /*fill={selectedCategory === "tv" ? "black" : "white"}
          onClick={() => {
            useStore.setState({
              selectedCategory: selectedCategory === "tv" ? null : "tv",
            });
          }} */
}

const RadarVerticalLegend = ({ setSelectedCategory, selectedCategory }) => {
  return (
    <div className="flex flex-col">
      <div className="text-xs uppercase text-left">Legend</div>
      <div className="flex flex-col relative">
        <div
          style={{
            position: "absolute",
            height: "320px",
            backgroundColor: "#9C9E9C",
            width: "1px",
            left: "5px",
            top: "45px",
            zIndex: 0,
          }}
        ></div>
        <div className="flex items-center">
          <div
            className="text-left"
            style={{
              fontSize: "12px",
            }}
          >
            time
          </div>
        </div>
        <div
          className="flex items-center my-1 relative"
          style={{
            height: "15px",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "-3px",
            }}
          >
            <svg
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 14L15 7.5L8 1L1 7.5L8 14Z" stroke="#9C9E9C" />
            </svg>{" "}
          </div>
        </div>

        <div className="flex items-center my-1 pl-2">
          <div className="flex items-center">
            <div
              className="mr-2"
              style={{
                backgroundColor: "white",
                width: "18px",
                height: "12px",
              }}
            ></div>
            <div
              className="text-left "
              style={{
                fontSize: "12px",
              }}
            >
              energy demand
            </div>

            <div
              className="ml-4 mr-2"
              style={{
                backgroundColor: "white",
                width: "10px",
                height: "10px",
                borderRadius: "10px",
                border: "1px solid black",
              }}
            ></div>
            <div
              className="text-left ml2"
              style={{
                fontSize: "12px",
              }}
            >
              peak
            </div>
          </div>
        </div>
        <div className="flex items-center my-1 pl-2">
          <div
            className="text-left pl-1"
            style={{
              fontSize: "12px",
            }}
          >
            activities (click to select them)
          </div>
        </div>
        <div className="relative">
          {activitiesArray.map((v, i) => {
            return (
              <div
                key={`legend-${i}`}
                className="flex items-center cursor-pointer z-10"
                style={{ marginBottom: "1px" }}
                onClick={() => {
                  setSelectedCategory(
                    selectedCategory === v.key ? null : v.key
                  );
                }}
              >
                <div
                  className="mr-2"
                  style={{
                    backgroundColor: colorByCategory[v.key],
                    width: "12px",
                    height: "12px",
                    borderRadius: "12px",
                  }}
                ></div>
                <div
                  className="text-left uppercase"
                  style={{
                    fontSize: "12px",
                    textDecoration:
                      selectedCategory === v.key ? "underline" : "none",
                  }}
                >
                  {v.value}
                </div>
              </div>
            );
          })}
          <div className="absolute top-0 right-0">
            <svg
              width="54"
              height="263"
              viewBox="0 0 54 263"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.5 24C12.5376 24 15 21.5376 15 18.5C15 15.4624 12.5376 13 9.5 13C6.46243 13 4 15.4624 4 18.5C4 21.5376 6.46243 24 9.5 24Z"
                fill="#9e0f0d"
              />
              <path
                d="M9.5 95C12.5376 95 15 92.5376 15 89.5C15 86.4624 12.5376 84 9.5 84C6.46243 84 4 86.4624 4 89.5C4 92.5376 6.46243 95 9.5 95Z"
                fill="#e06373"
              />
              <path
                d="M9.5 158C12.5376 158 15 155.538 15 152.5C15 149.462 12.5376 147 9.5 147C6.46243 147 4 149.462 4 152.5C4 155.538 6.46243 158 9.5 158Z"
                fill="#807ece"
              />
              <path
                d="M9.5 211C12.5376 211 15 208.538 15 205.5C15 202.462 12.5376 200 9.5 200C6.46243 200 4 202.462 4 205.5C4 208.538 6.46243 211 9.5 211Z"
                fill="#2b1475"
              />
              <path
                opacity="0.5"
                d="M5.76136 168L4.17045 162.182H4.88636L6.10227 166.92H6.15909L7.39773 162.182H8.19318L9.43182 166.92H9.48864L10.7045 162.182H11.4205L9.82955 168H9.10227L7.81818 163.364H7.77273L6.48864 168H5.76136ZM16.9339 165.091C16.9339 165.705 16.8232 166.235 16.6016 166.682C16.38 167.129 16.076 167.473 15.6896 167.716C15.3033 167.958 14.862 168.08 14.3658 168.08C13.8696 168.08 13.4283 167.958 13.0419 167.716C12.6555 167.473 12.3516 167.129 12.13 166.682C11.9084 166.235 11.7976 165.705 11.7976 165.091C11.7976 164.477 11.9084 163.947 12.13 163.5C12.3516 163.053 12.6555 162.708 13.0419 162.466C13.4283 162.223 13.8696 162.102 14.3658 162.102C14.862 162.102 15.3033 162.223 15.6896 162.466C16.076 162.708 16.38 163.053 16.6016 163.5C16.8232 163.947 16.9339 164.477 16.9339 165.091ZM16.2521 165.091C16.2521 164.587 16.1679 164.162 15.9993 163.815C15.8326 163.469 15.6063 163.206 15.3203 163.028C15.0362 162.85 14.718 162.761 14.3658 162.761C14.0135 162.761 13.6944 162.85 13.4084 163.028C13.1243 163.206 12.898 163.469 12.7294 163.815C12.5627 164.162 12.4794 164.587 12.4794 165.091C12.4794 165.595 12.5627 166.02 12.7294 166.366C12.898 166.713 13.1243 166.975 13.4084 167.153C13.6944 167.331 14.0135 167.42 14.3658 167.42C14.718 167.42 15.0362 167.331 15.3203 167.153C15.6063 166.975 15.8326 166.713 15.9993 166.366C16.1679 166.02 16.2521 165.595 16.2521 165.091ZM18.1186 168V162.182H20.0845C20.5391 162.182 20.9122 162.259 21.2038 162.415C21.4955 162.568 21.7114 162.779 21.8516 163.048C21.9917 163.317 22.0618 163.623 22.0618 163.966C22.0618 164.309 21.9917 164.613 21.8516 164.878C21.7114 165.143 21.4964 165.351 21.2067 165.503C20.9169 165.652 20.5466 165.727 20.0959 165.727H18.505V165.091H20.0732C20.3838 165.091 20.6338 165.045 20.8232 164.955C21.0144 164.864 21.1527 164.735 21.2379 164.568C21.325 164.4 21.3686 164.199 21.3686 163.966C21.3686 163.733 21.325 163.529 21.2379 163.355C21.1508 163.181 21.0116 163.046 20.8203 162.952C20.629 162.855 20.3762 162.807 20.0618 162.807H18.8232V168H18.1186ZM20.8572 165.386L22.2891 168H21.4709L20.0618 165.386H20.8572ZM23.2358 168V162.182H23.9403V165.068H24.0085L26.6222 162.182H27.5426L25.0994 164.807L27.5426 168H26.6903L24.6676 165.295L23.9403 166.114V168H23.2358ZM30.4205 161.909L28.5455 168.875H27.9318L29.8068 161.909H30.4205ZM4.38636 172.807V172.182H8.75V172.807H6.92045V178H6.21591V172.807H4.38636ZM9.83736 178V172.182H11.8033C12.2578 172.182 12.6309 172.259 12.9226 172.415C13.2143 172.568 13.4302 172.779 13.5703 173.048C13.7105 173.317 13.7805 173.623 13.7805 173.966C13.7805 174.309 13.7105 174.613 13.5703 174.878C13.4302 175.143 13.2152 175.351 12.9254 175.503C12.6357 175.652 12.2654 175.727 11.8146 175.727H10.2237V175.091H11.7919C12.1025 175.091 12.3525 175.045 12.5419 174.955C12.7332 174.864 12.8714 174.735 12.9567 174.568C13.0438 174.4 13.0874 174.199 13.0874 173.966C13.0874 173.733 13.0438 173.529 12.9567 173.355C12.8696 173.181 12.7304 173.046 12.5391 172.952C12.3478 172.855 12.0949 172.807 11.7805 172.807H10.5419V178H9.83736ZM12.576 175.386L14.0078 178H13.1896L11.7805 175.386H12.576ZM15.1932 178H14.4545L16.5909 172.182H17.3182L19.4545 178H18.7159L16.9773 173.102H16.9318L15.1932 178ZM15.4659 175.727H18.4432V176.352H15.4659V175.727ZM20.0526 172.182L21.7798 177.08H21.848L23.5753 172.182H24.3139L22.1776 178H21.4503L19.3139 172.182H20.0526ZM25.2202 178V172.182H28.7315V172.807H25.9247V174.773H28.5497V175.398H25.9247V177.375H28.777V178H25.2202ZM30.0014 178V172.182H30.706V177.375H33.4105V178H30.0014ZM34.5014 178V172.182H35.206V177.375H37.9105V178H34.5014ZM39.706 172.182V178H39.0014V172.182H39.706ZM45.7322 172.182V178H45.0504L41.88 173.432H41.8232V178H41.1186V172.182H41.8004L44.9822 176.761H45.0391V172.182H45.7322ZM51.1193 174C51.0568 173.809 50.9744 173.637 50.8722 173.486C50.7718 173.332 50.6515 173.202 50.5114 173.094C50.3731 172.986 50.2159 172.903 50.0398 172.847C49.8636 172.79 49.6705 172.761 49.4602 172.761C49.1155 172.761 48.8021 172.85 48.5199 173.028C48.2377 173.206 48.0133 173.469 47.8466 173.815C47.6799 174.162 47.5966 174.587 47.5966 175.091C47.5966 175.595 47.6809 176.02 47.8494 176.366C48.018 176.713 48.2462 176.975 48.5341 177.153C48.822 177.331 49.1458 177.42 49.5057 177.42C49.839 177.42 50.1326 177.349 50.3864 177.207C50.642 177.063 50.8409 176.861 50.983 176.599C51.1269 176.336 51.1989 176.027 51.1989 175.67L51.4148 175.716H49.6648V175.091H51.8807V175.716C51.8807 176.195 51.7784 176.612 51.5739 176.966C51.3712 177.32 51.0909 177.595 50.733 177.79C50.3769 177.983 49.9678 178.08 49.5057 178.08C48.9905 178.08 48.5379 177.958 48.1477 177.716C47.7595 177.473 47.4564 177.129 47.2386 176.682C47.0227 176.235 46.9148 175.705 46.9148 175.091C46.9148 174.631 46.9763 174.217 47.0994 173.849C47.2244 173.48 47.4006 173.166 47.6278 172.906C47.8551 172.647 48.1241 172.448 48.4347 172.31C48.7453 172.171 49.0871 172.102 49.4602 172.102C49.767 172.102 50.053 172.149 50.3182 172.241C50.5852 172.332 50.8229 172.462 51.0312 172.631C51.2415 172.797 51.4167 172.997 51.5568 173.23C51.697 173.461 51.7936 173.718 51.8466 174H51.1193Z"
                fill="black"
              />
              <path
                opacity="0.5"
                d="M4.70455 33V27.1818H6.67045C7.12689 27.1818 7.5 27.2642 7.78977 27.429C8.08144 27.5919 8.29735 27.8125 8.4375 28.0909C8.57765 28.3693 8.64773 28.6799 8.64773 29.0227C8.64773 29.3655 8.57765 29.6771 8.4375 29.9574C8.29924 30.2377 8.08523 30.4612 7.79545 30.6278C7.50568 30.7926 7.13447 30.875 6.68182 30.875H5.27273V30.25H6.65909C6.97159 30.25 7.22254 30.196 7.41193 30.0881C7.60133 29.9801 7.73864 29.8343 7.82386 29.6506C7.91098 29.465 7.95455 29.2557 7.95455 29.0227C7.95455 28.7898 7.91098 28.5814 7.82386 28.3977C7.73864 28.214 7.60038 28.0701 7.40909 27.9659C7.2178 27.8598 6.96402 27.8068 6.64773 27.8068H5.40909V33H4.70455ZM9.78267 33V27.1818H13.294V27.8068H10.4872V29.7727H13.1122V30.3977H10.4872V32.375H13.3395V33H9.78267ZM14.5639 33V27.1818H16.5298C16.9844 27.1818 17.3575 27.2595 17.6491 27.4148C17.9408 27.5682 18.1567 27.7794 18.2969 28.0483C18.437 28.3172 18.5071 28.6231 18.5071 28.9659C18.5071 29.3087 18.437 29.6127 18.2969 29.8778C18.1567 30.143 17.9418 30.3513 17.652 30.5028C17.3622 30.6525 16.992 30.7273 16.5412 30.7273H14.9503V30.0909H16.5185C16.8291 30.0909 17.0791 30.0455 17.2685 29.9545C17.4598 29.8636 17.598 29.7348 17.6832 29.5682C17.7704 29.3996 17.8139 29.1989 17.8139 28.9659C17.8139 28.733 17.7704 28.5294 17.6832 28.3551C17.5961 28.1809 17.4569 28.0464 17.2656 27.9517C17.0743 27.8551 16.8215 27.8068 16.5071 27.8068H15.2685V33H14.5639ZM17.3026 30.3864L18.7344 33H17.9162L16.5071 30.3864H17.3026ZM22.8629 28.6364C22.8288 28.3485 22.6906 28.125 22.4482 27.9659C22.2057 27.8068 21.9084 27.7273 21.5561 27.7273C21.2985 27.7273 21.0732 27.7689 20.88 27.8523C20.6887 27.9356 20.5391 28.0502 20.4311 28.196C20.325 28.3419 20.272 28.5076 20.272 28.6932C20.272 28.8485 20.3089 28.982 20.3828 29.0938C20.4586 29.2036 20.5552 29.2955 20.6726 29.3693C20.79 29.4413 20.9131 29.5009 21.0419 29.5483C21.1707 29.5937 21.2891 29.6307 21.397 29.6591L21.9879 29.8182C22.1394 29.858 22.308 29.9129 22.4936 29.983C22.6811 30.053 22.8601 30.1487 23.0305 30.2699C23.2029 30.3892 23.3449 30.5426 23.4567 30.7301C23.5684 30.9176 23.6243 31.1477 23.6243 31.4205C23.6243 31.7348 23.5419 32.0189 23.3771 32.2727C23.2143 32.5265 22.9756 32.7282 22.6612 32.8778C22.3487 33.0275 21.969 33.1023 21.522 33.1023C21.1054 33.1023 20.7446 33.035 20.4396 32.9006C20.1366 32.7661 19.898 32.5786 19.7237 32.3381C19.5514 32.0975 19.4538 31.8182 19.4311 31.5H20.1584C20.1773 31.7197 20.2512 31.9015 20.38 32.0455C20.5107 32.1875 20.6754 32.2936 20.8743 32.3636C21.075 32.4318 21.291 32.4659 21.522 32.4659C21.791 32.4659 22.0324 32.4223 22.2464 32.3352C22.4605 32.2462 22.63 32.1231 22.755 31.9659C22.88 31.8068 22.9425 31.6212 22.9425 31.4091C22.9425 31.2159 22.8885 31.0587 22.7805 30.9375C22.6726 30.8163 22.5305 30.7178 22.3544 30.642C22.1783 30.5663 21.9879 30.5 21.7834 30.4432L21.0675 30.2386C20.6129 30.108 20.2531 29.9214 19.9879 29.679C19.7228 29.4366 19.5902 29.1193 19.5902 28.7273C19.5902 28.4015 19.6783 28.1174 19.8544 27.875C20.0324 27.6307 20.2711 27.4413 20.5703 27.3068C20.8714 27.1705 21.2076 27.1023 21.5788 27.1023C21.9538 27.1023 22.2872 27.1695 22.5788 27.304C22.8705 27.4366 23.1016 27.6184 23.272 27.8494C23.4444 28.0805 23.5353 28.3428 23.5447 28.6364H22.8629ZM29.6918 30.0909C29.6918 30.7045 29.581 31.2348 29.3594 31.6818C29.1378 32.1288 28.8338 32.4735 28.4474 32.7159C28.0611 32.9583 27.6198 33.0795 27.1236 33.0795C26.6274 33.0795 26.1861 32.9583 25.7997 32.7159C25.4134 32.4735 25.1094 32.1288 24.8878 31.6818C24.6662 31.2348 24.5554 30.7045 24.5554 30.0909C24.5554 29.4773 24.6662 28.947 24.8878 28.5C25.1094 28.053 25.4134 27.7083 25.7997 27.4659C26.1861 27.2235 26.6274 27.1023 27.1236 27.1023C27.6198 27.1023 28.0611 27.2235 28.4474 27.4659C28.8338 27.7083 29.1378 28.053 29.3594 28.5C29.581 28.947 29.6918 29.4773 29.6918 30.0909ZM29.0099 30.0909C29.0099 29.5871 28.9257 29.1619 28.7571 28.8153C28.5904 28.4688 28.3641 28.2064 28.0781 28.0284C27.794 27.8504 27.4759 27.7614 27.1236 27.7614C26.7713 27.7614 26.4522 27.8504 26.1662 28.0284C25.8821 28.2064 25.6558 28.4688 25.4872 28.8153C25.3205 29.1619 25.2372 29.5871 25.2372 30.0909C25.2372 30.5947 25.3205 31.0199 25.4872 31.3665C25.6558 31.7131 25.8821 31.9754 26.1662 32.1534C26.4522 32.3314 26.7713 32.4205 27.1236 32.4205C27.4759 32.4205 27.794 32.3314 28.0781 32.1534C28.3641 31.9754 28.5904 31.7131 28.7571 31.3665C28.9257 31.0199 29.0099 30.5947 29.0099 30.0909ZM35.4901 27.1818V33H34.8082L31.6378 28.4318H31.581V33H30.8764V27.1818H31.5582L34.7401 31.7614H34.7969V27.1818H35.4901ZM37.1385 33H36.3999L38.5362 27.1818H39.2635L41.3999 33H40.6612L38.9226 28.1023H38.8771L37.1385 33ZM37.4112 30.7273H40.3885V31.3523H37.4112V30.7273ZM42.3061 33V27.1818H43.0107V32.375H45.7152V33H42.3061ZM9.31818 37.1818V43H8.63636L5.46591 38.4318H5.40909V43H4.70455V37.1818H5.38636L8.56818 41.7614H8.625V37.1818H9.31818ZM10.728 43V37.1818H14.2393V37.8068H11.4325V39.7727H14.0575V40.3977H11.4325V42.375H14.2848V43H10.728ZM15.5092 43V37.1818H19.0206V37.8068H16.2138V39.7727H18.8388V40.3977H16.2138V42.375H19.0661V43H15.5092ZM22.0859 43H20.2905V37.1818H22.1655C22.7299 37.1818 23.2128 37.2983 23.6143 37.5312C24.0159 37.7623 24.3236 38.0947 24.5376 38.5284C24.7517 38.9602 24.8587 39.4773 24.8587 40.0795C24.8587 40.6856 24.7507 41.2074 24.5348 41.6449C24.3189 42.0805 24.0045 42.4157 23.5916 42.6506C23.1787 42.8835 22.6768 43 22.0859 43ZM20.995 42.375H22.0405C22.5215 42.375 22.9202 42.2822 23.2365 42.0966C23.5528 41.911 23.7886 41.6468 23.9439 41.304C24.0992 40.9612 24.1768 40.553 24.1768 40.0795C24.1768 39.6098 24.1001 39.2055 23.9467 38.8665C23.7933 38.5256 23.5642 38.2642 23.2592 38.0824C22.9543 37.8987 22.5746 37.8068 22.12 37.8068H20.995V42.375ZM29.2223 38.6364C29.1882 38.3485 29.05 38.125 28.8075 37.9659C28.5651 37.8068 28.2678 37.7273 27.9155 37.7273C27.6579 37.7273 27.4325 37.7689 27.2393 37.8523C27.0481 37.9356 26.8984 38.0502 26.7905 38.196C26.6844 38.3419 26.6314 38.5076 26.6314 38.6932C26.6314 38.8485 26.6683 38.982 26.7422 39.0938C26.8179 39.2036 26.9145 39.2955 27.032 39.3693C27.1494 39.4413 27.2725 39.5009 27.4013 39.5483C27.5301 39.5937 27.6484 39.6307 27.7564 39.6591L28.3473 39.8182C28.4988 39.858 28.6674 39.9129 28.853 39.983C29.0405 40.053 29.2195 40.1487 29.3899 40.2699C29.5623 40.3892 29.7043 40.5426 29.8161 40.7301C29.9278 40.9176 29.9837 41.1477 29.9837 41.4205C29.9837 41.7348 29.9013 42.0189 29.7365 42.2727C29.5736 42.5265 29.335 42.7282 29.0206 42.8778C28.7081 43.0275 28.3284 43.1023 27.8814 43.1023C27.4647 43.1023 27.1039 43.035 26.799 42.9006C26.496 42.7661 26.2573 42.5786 26.0831 42.3381C25.9107 42.0975 25.8132 41.8182 25.7905 41.5H26.5178C26.5367 41.7197 26.6106 41.9015 26.7393 42.0455C26.87 42.1875 27.0348 42.2936 27.2337 42.3636C27.4344 42.4318 27.6503 42.4659 27.8814 42.4659C28.1503 42.4659 28.3918 42.4223 28.6058 42.3352C28.8198 42.2462 28.9893 42.1231 29.1143 41.9659C29.2393 41.8068 29.3018 41.6212 29.3018 41.4091C29.3018 41.2159 29.2479 41.0587 29.1399 40.9375C29.032 40.8163 28.8899 40.7178 28.7138 40.642C28.5376 40.5663 28.3473 40.5 28.1428 40.4432L27.4268 40.2386C26.9723 40.108 26.6125 39.9214 26.3473 39.679C26.0821 39.4366 25.9496 39.1193 25.9496 38.7273C25.9496 38.4015 26.0376 38.1174 26.2138 37.875C26.3918 37.6307 26.6304 37.4413 26.9297 37.3068C27.2308 37.1705 27.567 37.1023 27.9382 37.1023C28.3132 37.1023 28.6465 37.1695 28.9382 37.304C29.2299 37.4366 29.4609 37.6184 29.6314 37.8494C29.8037 38.0805 29.8946 38.3428 29.9041 38.6364H29.2223Z"
                fill="black"
              />
              <line
                opacity="0.5"
                x1="0.3"
                y1="-1.31134e-08"
                x2="0.300003"
                y2="68"
                stroke="black"
                strokeWidth="0.6"
              />
              <path
                opacity="0.5"
                d="M4.70455 105V99.1818H5.40909V104.375H8.11364V105H4.70455ZM9.20455 105V99.1818H12.7159V99.8068H9.90909V101.773H12.5341V102.398H9.90909V104.375H12.7614V105H9.20455ZM14.6903 99.1818V105H13.9858V99.1818H14.6903ZM19.2848 100.636C19.2507 100.348 19.1125 100.125 18.87 99.9659C18.6276 99.8068 18.3303 99.7273 17.978 99.7273C17.7204 99.7273 17.495 99.7689 17.3018 99.8523C17.1106 99.9356 16.9609 100.05 16.853 100.196C16.7469 100.342 16.6939 100.508 16.6939 100.693C16.6939 100.848 16.7308 100.982 16.8047 101.094C16.8804 101.204 16.977 101.295 17.0945 101.369C17.2119 101.441 17.335 101.501 17.4638 101.548C17.5926 101.594 17.7109 101.631 17.8189 101.659L18.4098 101.818C18.5613 101.858 18.7299 101.913 18.9155 101.983C19.103 102.053 19.282 102.149 19.4524 102.27C19.6248 102.389 19.7668 102.543 19.8786 102.73C19.9903 102.918 20.0462 103.148 20.0462 103.42C20.0462 103.735 19.9638 104.019 19.799 104.273C19.6361 104.527 19.3975 104.728 19.0831 104.878C18.7706 105.027 18.3909 105.102 17.9439 105.102C17.5272 105.102 17.1664 105.035 16.8615 104.901C16.5585 104.766 16.3198 104.579 16.1456 104.338C15.9732 104.098 15.8757 103.818 15.853 103.5H16.5803C16.5992 103.72 16.6731 103.902 16.8018 104.045C16.9325 104.187 17.0973 104.294 17.2962 104.364C17.4969 104.432 17.7128 104.466 17.9439 104.466C18.2128 104.466 18.4543 104.422 18.6683 104.335C18.8823 104.246 19.0518 104.123 19.1768 103.966C19.3018 103.807 19.3643 103.621 19.3643 103.409C19.3643 103.216 19.3104 103.059 19.2024 102.938C19.0945 102.816 18.9524 102.718 18.7763 102.642C18.6001 102.566 18.4098 102.5 18.2053 102.443L17.4893 102.239C17.0348 102.108 16.675 101.921 16.4098 101.679C16.1446 101.437 16.0121 101.119 16.0121 100.727C16.0121 100.402 16.1001 100.117 16.2763 99.875C16.4543 99.6307 16.6929 99.4413 16.9922 99.3068C17.2933 99.1705 17.6295 99.1023 18.0007 99.1023C18.3757 99.1023 18.709 99.1695 19.0007 99.304C19.2924 99.4366 19.5234 99.6184 19.6939 99.8494C19.8662 100.08 19.9571 100.343 19.9666 100.636H19.2848ZM25.0227 99.1818H25.7273V103.034C25.7273 103.432 25.6335 103.787 25.446 104.099C25.2604 104.41 24.9981 104.655 24.6591 104.835C24.3201 105.013 23.9223 105.102 23.4659 105.102C23.0095 105.102 22.6117 105.013 22.2727 104.835C21.9337 104.655 21.6705 104.41 21.483 104.099C21.2973 103.787 21.2045 103.432 21.2045 103.034V99.1818H21.9091V102.977C21.9091 103.261 21.9716 103.514 22.0966 103.736C22.2216 103.955 22.3996 104.129 22.6307 104.256C22.8636 104.381 23.142 104.443 23.4659 104.443C23.7898 104.443 24.0682 104.381 24.3011 104.256C24.5341 104.129 24.7121 103.955 24.8352 103.736C24.9602 103.514 25.0227 103.261 25.0227 102.977V99.1818ZM27.1342 105V99.1818H29.1001C29.5547 99.1818 29.9278 99.2595 30.2195 99.4148C30.5111 99.5682 30.727 99.7794 30.8672 100.048C31.0073 100.317 31.0774 100.623 31.0774 100.966C31.0774 101.309 31.0073 101.613 30.8672 101.878C30.727 102.143 30.5121 102.351 30.2223 102.503C29.9325 102.652 29.5623 102.727 29.1115 102.727H27.5206V102.091H29.0888C29.3994 102.091 29.6494 102.045 29.8388 101.955C30.0301 101.864 30.1683 101.735 30.2536 101.568C30.3407 101.4 30.3842 101.199 30.3842 100.966C30.3842 100.733 30.3407 100.529 30.2536 100.355C30.1664 100.181 30.0272 100.046 29.8359 99.9517C29.6446 99.8551 29.3918 99.8068 29.0774 99.8068H27.8388V105H27.1342ZM29.8729 102.386L31.3047 105H30.4865L29.0774 102.386H29.8729ZM32.2514 105V99.1818H35.7628V99.8068H32.956V101.773H35.581V102.398H32.956V104.375H35.8082V105H32.2514Z"
                fill="black"
              />
              <line
                opacity="0.5"
                x1="0.3"
                y1="133"
                x2="0.300002"
                y2="186"
                stroke="black"
                strokeWidth="0.6"
              />
              <line
                opacity="0.5"
                x1="0.3"
                y1="85"
                x2="0.299998"
                y2="128"
                stroke="black"
                strokeWidth="0.6"
              />
              <path
                opacity="0.5"
                d="M4.70455 221V215.182H5.40909V217.773H8.51136V215.182H9.21591V221H8.51136V218.398H5.40909V221H4.70455ZM15.5355 218.091C15.5355 218.705 15.4247 219.235 15.2031 219.682C14.9815 220.129 14.6776 220.473 14.2912 220.716C13.9048 220.958 13.4635 221.08 12.9673 221.08C12.4711 221.08 12.0298 220.958 11.6435 220.716C11.2571 220.473 10.9531 220.129 10.7315 219.682C10.5099 219.235 10.3991 218.705 10.3991 218.091C10.3991 217.477 10.5099 216.947 10.7315 216.5C10.9531 216.053 11.2571 215.708 11.6435 215.466C12.0298 215.223 12.4711 215.102 12.9673 215.102C13.4635 215.102 13.9048 215.223 14.2912 215.466C14.6776 215.708 14.9815 216.053 15.2031 216.5C15.4247 216.947 15.5355 217.477 15.5355 218.091ZM14.8537 218.091C14.8537 217.587 14.7694 217.162 14.6009 216.815C14.4342 216.469 14.2079 216.206 13.9219 216.028C13.6378 215.85 13.3196 215.761 12.9673 215.761C12.6151 215.761 12.2959 215.85 12.0099 216.028C11.7259 216.206 11.4995 216.469 11.331 216.815C11.1643 217.162 11.081 217.587 11.081 218.091C11.081 218.595 11.1643 219.02 11.331 219.366C11.4995 219.713 11.7259 219.975 12.0099 220.153C12.2959 220.331 12.6151 220.42 12.9673 220.42C13.3196 220.42 13.6378 220.331 13.9219 220.153C14.2079 219.975 14.4342 219.713 14.6009 219.366C14.7694 219.02 14.8537 218.595 14.8537 218.091ZM20.5384 215.182H21.2429V219.034C21.2429 219.432 21.1491 219.787 20.9616 220.099C20.776 220.41 20.5137 220.655 20.1747 220.835C19.8357 221.013 19.438 221.102 18.9815 221.102C18.5251 221.102 18.1274 221.013 17.7884 220.835C17.4493 220.655 17.1861 220.41 16.9986 220.099C16.813 219.787 16.7202 219.432 16.7202 219.034V215.182H17.4247V218.977C17.4247 219.261 17.4872 219.514 17.6122 219.736C17.7372 219.955 17.9152 220.129 18.1463 220.256C18.3793 220.381 18.6577 220.443 18.9815 220.443C19.3054 220.443 19.5838 220.381 19.8168 220.256C20.0497 220.129 20.2277 219.955 20.3509 219.736C20.4759 219.514 20.5384 219.261 20.5384 218.977V215.182ZM25.8317 216.636C25.7976 216.348 25.6593 216.125 25.4169 215.966C25.1745 215.807 24.8771 215.727 24.5249 215.727C24.2673 215.727 24.0419 215.769 23.8487 215.852C23.6574 215.936 23.5078 216.05 23.3999 216.196C23.2938 216.342 23.2408 216.508 23.2408 216.693C23.2408 216.848 23.2777 216.982 23.3516 217.094C23.4273 217.204 23.5239 217.295 23.6413 217.369C23.7588 217.441 23.8819 217.501 24.0107 217.548C24.1394 217.594 24.2578 217.631 24.3658 217.659L24.9567 217.818C25.1082 217.858 25.2768 217.913 25.4624 217.983C25.6499 218.053 25.8288 218.149 25.9993 218.27C26.1716 218.389 26.3137 218.543 26.4254 218.73C26.5372 218.918 26.593 219.148 26.593 219.42C26.593 219.735 26.5107 220.019 26.3459 220.273C26.183 220.527 25.9444 220.728 25.63 220.878C25.3175 221.027 24.9377 221.102 24.4908 221.102C24.0741 221.102 23.7133 221.035 23.4084 220.901C23.1054 220.766 22.8667 220.579 22.6925 220.338C22.5201 220.098 22.4226 219.818 22.3999 219.5H23.1271C23.1461 219.72 23.2199 219.902 23.3487 220.045C23.4794 220.187 23.6442 220.294 23.843 220.364C24.0438 220.432 24.2597 220.466 24.4908 220.466C24.7597 220.466 25.0012 220.422 25.2152 220.335C25.4292 220.246 25.5987 220.123 25.7237 219.966C25.8487 219.807 25.9112 219.621 25.9112 219.409C25.9112 219.216 25.8572 219.059 25.7493 218.938C25.6413 218.816 25.4993 218.718 25.3232 218.642C25.147 218.566 24.9567 218.5 24.7521 218.443L24.0362 218.239C23.5817 218.108 23.2218 217.921 22.9567 217.679C22.6915 217.437 22.5589 217.119 22.5589 216.727C22.5589 216.402 22.647 216.117 22.8232 215.875C23.0012 215.631 23.2398 215.441 23.5391 215.307C23.8402 215.17 24.1764 215.102 24.5476 215.102C24.9226 215.102 25.2559 215.17 25.5476 215.304C25.8393 215.437 26.0703 215.618 26.2408 215.849C26.4131 216.08 26.504 216.343 26.5135 216.636H25.8317ZM27.7514 221V215.182H31.2628V215.807H28.456V217.773H31.081V218.398H28.456V220.375H31.3082V221H27.7514ZM32.5327 221V215.182H33.2372V217.773H36.3395V215.182H37.044V221H36.3395V218.398H33.2372V221H32.5327ZM43.3636 218.091C43.3636 218.705 43.2528 219.235 43.0312 219.682C42.8097 220.129 42.5057 220.473 42.1193 220.716C41.733 220.958 41.2917 221.08 40.7955 221.08C40.2992 221.08 39.858 220.958 39.4716 220.716C39.0852 220.473 38.7813 220.129 38.5597 219.682C38.3381 219.235 38.2273 218.705 38.2273 218.091C38.2273 217.477 38.3381 216.947 38.5597 216.5C38.7813 216.053 39.0852 215.708 39.4716 215.466C39.858 215.223 40.2992 215.102 40.7955 215.102C41.2917 215.102 41.733 215.223 42.1193 215.466C42.5057 215.708 42.8097 216.053 43.0312 216.5C43.2528 216.947 43.3636 217.477 43.3636 218.091ZM42.6818 218.091C42.6818 217.587 42.5975 217.162 42.429 216.815C42.2623 216.469 42.036 216.206 41.75 216.028C41.4659 215.85 41.1477 215.761 40.7955 215.761C40.4432 215.761 40.1241 215.85 39.8381 216.028C39.554 216.206 39.3277 216.469 39.1591 216.815C38.9924 217.162 38.9091 217.587 38.9091 218.091C38.9091 218.595 38.9924 219.02 39.1591 219.366C39.3277 219.713 39.554 219.975 39.8381 220.153C40.1241 220.331 40.4432 220.42 40.7955 220.42C41.1477 220.42 41.4659 220.331 41.75 220.153C42.036 219.975 42.2623 219.713 42.429 219.366C42.5975 219.02 42.6818 218.595 42.6818 218.091ZM44.5483 221V215.182H45.2528V220.375H47.9574V221H44.5483ZM50.8438 221H49.0483V215.182H50.9233C51.4877 215.182 51.9706 215.298 52.3722 215.531C52.7737 215.762 53.0814 216.095 53.2955 216.528C53.5095 216.96 53.6165 217.477 53.6165 218.08C53.6165 218.686 53.5085 219.207 53.2926 219.645C53.0767 220.08 52.7623 220.416 52.3494 220.651C51.9366 220.884 51.4347 221 50.8438 221ZM49.7528 220.375H50.7983C51.2794 220.375 51.678 220.282 51.9943 220.097C52.3106 219.911 52.5464 219.647 52.7017 219.304C52.857 218.961 52.9347 218.553 52.9347 218.08C52.9347 217.61 52.858 217.205 52.7045 216.866C52.5511 216.526 52.322 216.264 52.017 216.082C51.7121 215.899 51.3324 215.807 50.8778 215.807H49.7528V220.375ZM9.38636 227H8.68182C8.64015 226.797 8.56724 226.619 8.46307 226.466C8.3608 226.312 8.2358 226.184 8.08807 226.08C7.94223 225.973 7.7803 225.894 7.60227 225.841C7.42424 225.788 7.23864 225.761 7.04545 225.761C6.69318 225.761 6.37405 225.85 6.08807 226.028C5.80398 226.206 5.57765 226.469 5.40909 226.815C5.24242 227.162 5.15909 227.587 5.15909 228.091C5.15909 228.595 5.24242 229.02 5.40909 229.366C5.57765 229.713 5.80398 229.975 6.08807 230.153C6.37405 230.331 6.69318 230.42 7.04545 230.42C7.23864 230.42 7.42424 230.394 7.60227 230.341C7.7803 230.288 7.94223 230.209 8.08807 230.105C8.2358 229.999 8.3608 229.869 8.46307 229.716C8.56724 229.561 8.64015 229.383 8.68182 229.182H9.38636C9.33333 229.479 9.23674 229.745 9.09659 229.98C8.95644 230.215 8.7822 230.415 8.57386 230.58C8.36553 230.742 8.13163 230.866 7.87216 230.952C7.61458 231.037 7.33902 231.08 7.04545 231.08C6.54924 231.08 6.10795 230.958 5.72159 230.716C5.33523 230.473 5.03125 230.129 4.80966 229.682C4.58807 229.235 4.47727 228.705 4.47727 228.091C4.47727 227.477 4.58807 226.947 4.80966 226.5C5.03125 226.053 5.33523 225.708 5.72159 225.466C6.10795 225.223 6.54924 225.102 7.04545 225.102C7.33902 225.102 7.61458 225.145 7.87216 225.23C8.13163 225.315 8.36553 225.44 8.57386 225.605C8.7822 225.768 8.95644 225.967 9.09659 226.202C9.23674 226.435 9.33333 226.701 9.38636 227ZM10.7635 231H10.0249L12.1612 225.182H12.8885L15.0249 231H14.2862L12.5476 226.102H12.5021L10.7635 231ZM11.0362 228.727H14.0135V229.352H11.0362V228.727ZM15.9311 231V225.182H17.897C18.3516 225.182 18.7247 225.259 19.0163 225.415C19.308 225.568 19.5239 225.779 19.6641 226.048C19.8042 226.317 19.8743 226.623 19.8743 226.966C19.8743 227.309 19.8042 227.613 19.6641 227.878C19.5239 228.143 19.3089 228.351 19.0192 228.503C18.7294 228.652 18.3591 228.727 17.9084 228.727H16.3175V228.091H17.8857C18.1963 228.091 18.4463 228.045 18.6357 227.955C18.8269 227.864 18.9652 227.735 19.0504 227.568C19.1375 227.4 19.1811 227.199 19.1811 226.966C19.1811 226.733 19.1375 226.529 19.0504 226.355C18.9633 226.181 18.8241 226.046 18.6328 225.952C18.4415 225.855 18.1887 225.807 17.8743 225.807H16.6357V231H15.9311ZM18.6697 228.386L20.1016 231H19.2834L17.8743 228.386H18.6697ZM21.0483 231V225.182H24.5597V225.807H21.7528V227.773H24.3778V228.398H21.7528V230.375H24.6051V231H21.0483Z"
                fill="black"
              />
              <line
                opacity="0.5"
                x1="0.3"
                y1="191"
                x2="0.300003"
                y2="263"
                stroke="black"
                strokeWidth="0.6"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center my-1">
          <div
            style={{
              height: "20px",
              backgroundColor: "#000",
              width: "2px",
              marginLeft: "5px",
            }}
          ></div>
          <div
            className="text-left pl-4"
            style={{
              fontSize: "12px",
            }}
          >
            energy price
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadarVerticalLegend;
