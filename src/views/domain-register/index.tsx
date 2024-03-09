import React, { useEffect, useRef, useState } from "react";
import SearchSection from "./SearchSection";
import TradingSection from "./TradingSection";
import { Flex, GradientText } from "@/components";
import NotFound from "@/components/NotFound";
import { MdOutlineSearch } from "react-icons/md";
import { useRouter } from "next/router";
import { Autocomplete } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useDomainDetails } from "@/utils/web3/useDomainDetails";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useQueryClient } from "@tanstack/react-query";

// import { useRegisterDomain } from "@/utils/web3/useRegisterDomain";
const DomainRegisterView: React.FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const search = searchParams.get("domain");
  const [domainStatus, setDomainStatus] = useState<boolean>(false);
  const timeoutId = useRef<undefined | ReturnType<typeof setTimeout>>(undefined);
  const [searchedDomain, setSearchedDomain] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const { domainData, domainQuery } = useDomainDetails(searchedDomain || "");
  const [AutocompleteOpen, setAutocompleteOpen] = useState<boolean>(false);

  const options = [
    {
      label: searchedDomain,
      status: searchedDomain === "" ? "" : domainStatus
    }
  ];

  useEffect(() => {
    if ((domainData as { domainName: string })?.domainName === "") {
      setDomainStatus(true);
    } else {
      setDomainStatus(false);
    }
    setLoading(true);
  }, [domainData]);

  useEffect(() => {
    setSearchedDomain(search || "");
  }, [search]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    clearTimeout(timeoutId.current);
    setSearchedDomain(inputText);
    timeoutId.current = setTimeout(async () => {
      queryClient.invalidateQueries({ queryKey: domainQuery });
    }, 300);
  };

  const handleButtonClick = () => {
    setAutocompleteOpen(false);
    router.push({
      pathname: `/search`,
      query: { domain: searchedDomain }
    });
  };

  return (
    <Flex direction="flex-col" align="items-center" className="pt-[200px]">
      {search === "" ? (
        <NotFound label="There is no domains" />
      ) : (
        <>
          <div className="uppercase text-[60px] font-500 small:text-[36px] text-center">
            <GradientText>Register a domain</GradientText>
          </div>
          <div className="relative border border-white-200 bg-black-400 rounded-full w-full mt-[70px]">
            <Autocomplete
              open={searchedDomain !== "" && AutocompleteOpen}
              onBlur={() => setAutocompleteOpen(false)}
              onFocus={() => setAutocompleteOpen(true)}
              options={options}
              renderOption={(props, option) => {
                return (
                  <Flex
                    key={option.label}
                    justifyContent="justify-between"
                    className="p-2 px-6 font-space_grotesk cursor-pointer hover:bg-gray-200/40"
                    action={() => handleButtonClick()}
                  >
                    <p className="text-5 font-600 text-main-300">{option.label}</p>
                    <p className={`text-4 font-500 ${!option.status ? "text-red-500" : "text-blue-500"}`}>
                      {isLoading ? (
                        <AiOutlineLoading3Quarters className="w-5 h-5 loading-icon" />
                      ) : option.status === "" ? (
                        ""
                      ) : option.status ? (
                        <p className="bg-verified p-2 rounded-full" />
                      ) : (
                        <p className="bg-red-500 p-2 rounded-full" />
                      )}
                    </p>
                  </Flex>
                );
              }}
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <input
                    {...params.inputProps}
                    value={searchedDomain}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleButtonClick();
                    }}
                    placeholder="Search Domain Names"
                    className="w-full h-[55px] p-6 text-[16px] font-400 placeholder:text-white-500 border-none outline-none bg-transparent"
                  />
                  <button
                    type="submit"
                    onClick={handleButtonClick}
                    className="absolute w-[190px] tablet:w-[180px] small:w-[55px] h-full right-0 bg-primary rounded-full inline-flex items-center justify-center"
                  >
                    <MdOutlineSearch className="text-black w-8 h-8" />
                  </button>
                </div>
              )}
            />
          </div>

          <Flex direction="flex-col" className="w-full pt-[47px] space-y-[80px] small:space-y-[50px]">
            <SearchSection search={search || ""} />
            {(search || "") !== "" && <TradingSection />}
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default DomainRegisterView;
